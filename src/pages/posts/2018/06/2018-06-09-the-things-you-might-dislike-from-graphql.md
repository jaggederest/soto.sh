---
path: "/posts/2018/06/09/things-you-might-dislike-about-graphql"
date: "2018-06-09"
title: "Things You Might Dislike About GraphQL"
tags: ["GraphQL"]
---

Back in 2016 I discovered for the first time [GraphQL](https://graphql.org/), and by discovering I mean just looking the basic documentation and examples and, in all honesty, the technology didn't make that much sense to me. It wasn't something about the core idea itself, but all the complications it might arise from the implementation, including potential security holes.

Something pretty common in multiple engineering disciplines, from structural engineering to computer engineering, are the **trade-offs** between the multiple options you have when designing a system or a solution.

When facing the solution for a problem, you have to choose from a range of options. The most common problem is that none of the options is better than the other. Each one has its advantages and disadvantages and, to make the situation worse, sometimes more than one of the options fits the solution properly.

Common examples are choosing between compute analytics directly from raw data or storing pre-computed analytics, choosing your signal modulation in communications theory, choosing between an IPS or a TN LCD panel, etc.

The situation is not different thinking about GraphQL. When you're migrating from a RESTful API, in which the development is a pretty straightforward process given all the available frameworks in multiple languages, to a GraphQL single endpoint, you're **shifting the implementation complexity** from your application frontend to your backend. This idea is intuitive, because you must now support almost infinite possible input combinations, considering security issues that might arise, performance consequences and, since is the new kid on the street, facing a technology that has multiple opinions about how its implementation should be.

So, why in the world would you implement a GraphQL backend if you're all-good with a RESTful backend and GraphQL seems to bring just more issues to the table?

I came to this conclusion in 2016, but in 2018 I decided to give GraphQL a try because of a project with more than 5 different data sources (a MySQL database, a PostgreSQL database, two APIs and a Mongo Database) and arbitrary queries crossing data between them. When designing and developing this project I realized that **there are actual benefits of using the protocol!** When you find an elegant and scalable solution for each of the issues you encounter, the benefits of using GraphQL start to arise.

The purpose of this article is **not**:

* Giving a description about what GraphQL is or how to do your first `Hello world`. There are truly excellent articles over there on the Internet, even the official GraphQL docs, per language.

* Telling you that implementing GraphQL is better than a traditional API for your project. It might be not. And remember, there's always **trade-offs**.

The purpose of this article **is**:

* Summarizing a list of the main implementation concerns that might arise when you are thinking about using this technology.

* To describe the potential solution for each of this concerns.

* To give a list of the benefits you get when you implement a GraphQL backend instead of a traditional API.

In the future, it's possible I'll write entire articles for each one of this points. I'll update this post with the links as this happens.

### You End Up Computing More Than You Actually Need

Let's consider the following GraphQL schema:

```graphql
type User {
  id: ID!
  firstName: String
  lastName: String
  email: String
  """
  How many friends does the user have?
  """
  friendsCount: Int
}
```

When thinking about this on a DBMS, you might realize that computing `friendsCount` requires you to query your table, collection or entity, and retrieving the total count.

Problems arise when you have to query something like this:

```graphql
query getUser {
  user(id: 302) {
    id
    firstName
    lastName
  }
}
```

Is `friendsCount` still going to be computed when rendering this query results? This obviously depends on the way you're implementing it, but should not suppose a performance risk when implementing a GraphQL system.

You might be tempted to think that this computation still happens, or lazily avoiding it is complicated. However, this is not the case, since GraphQL is designed having this consideration in mind through **lazy implementations**. In all the languages where you can find a GraphQL backend implementation, you're allowed to declare lazy values to your schema, and this is considered by design!

Here's an example in JavaScript. Leaving the library / implementation aside you end up writing stuff _similar_ to this:

```javascript
// ...

// This function is used to resolve user(id: 302) in your
// query.
async function user({ id }) {
  // Get your user from your model somehow
  const user = await User.find({ id })

  return {
    id() {
      return user.id
    },
    firstName() {
      return user.firstName
    },
    lastName() {
      return user.lastName
    },
    email() {
      return user.email
    },
    friendsCount() {
      return Friendships.count({ $or: [{ user1: id }, { user2: id }] })
    },
  }
}

// ...
```

Since these values are now functions, your GraphQL library of choice will now know that these functions should only be executed when the value is expected to be returned. **The resolver will even wait for promises to be completed before displaying the value!** So, in this example, the function `friendsCount` won't be called and the database query won't be performed.

This way, you can lazy-ify (is that even a word?) all your computations, and you'll always be performing the operations your client already needs. That's not the case for a RESTful API most of the time, is it?

However, there's one problem with the implementation above. When performing `User.find({ id })`, you're still bringing up all the attributes from your database or API even when the client is not expecting them all. At the moment of writing I haven't been able to find and scalable yet intuitive way to find a solution for this. I'd love to hear how you're solving this problem in the comments section. However, even though you pull more data than you need from the database, you still avoid additional database queries and expensive computations derived from your data with this approach.

### Reusability Of Your Code

Where GraphQL truly shines is at querying the relationships between your data easily, and there are many tools to simplify and make this process more productivity. However, with all this potential, it's not uncommon that you bring up a document type in one section of your query, and the same document type (maybe with another ID), in another section of your query.

In this document schema you might have computed values as discussed above, so maybe in your root value for this schema you already have your lazy functions to load the data on-demand. How can you reuse this function across all the documents?

Consider this example of a simple bulletin board:

```graphql
type User {
  id: ID!
  firstName: String
  lastName: String
  email: String
  subscribersCount: Int
}

type Post {
  id: ID!
  title: String
  content: String
  user: User
  comments(first: Int!): [Comment]
}

type Comment {
  id: ID!
  post: Post
  comment: String
  user: User
}
```

So, you might end up querying something like this:

```graphql
query getPost {
  post(id: 59) {
    id
    title
    content
    user {
      id
      firstName
      lastName
      email
      subscribersCount
    }
    comments(first: 10) {
      id
      content
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
}
```

You can see here that the `User` schema is being called twice. However, if you implement everything on a root value resolver as in this example:

```javascript
// ...

async function post({ id }) {
  const post = await Post.find({ id })

  return {
    ...post, // Just leave the values alone.
    async user() {
      const user = await User.find({ id: post.userId })

      return {
        ...user,
        subscribersCount() {
          return Subscription.count({ targetUserId: user.id })
        },
      }
    },
    async comments({ first }) {
      const comments = await Comments.find({ postId: post.id })

      return comments.map(comment => ({
        ...comment,
        // See! This code is THE SAME as the
        async user() {
          const user = await User.find({ id: comments.userId })

          return {
            ...user,
            subscribersCount() {
              return Subscription.count({ targetUserId: user.id })
            },
          }
        },
      }))
    },
  }
}

// ...
```

you clearly see this approach does not scale for the infinite possible combinations that your query consumer might desire to implement.

Luckily, this issue is easily avoidable just with code and good practices, and does not require any additional library or framework to avoid it.

You can define a `resolveUser` function as follows:

```javascript
function resolveUser(user) {
  return {
    ...user,
    subscribersCount() {
      return Subscription.count({ targetUserId: user.id })
    },
  }
}
```

And then invoke it on the code shown above:

```javascript
// ...

async function post({ id }) {
  const post = await Post.find({ id })

  return {
    ...post, // Just leave the values alone.
    async user() {
      const user = await User.find({ id: post.userId })

      return resolveUser(user)
    },
    async comments({ first }) {
      const comments = await Comments.find({ postId: post.id })

      return comments.map(comment => ({
        ...comment,
        // See! This code is THE SAME as the
        async user() {
          const user = await User.find({ id: comments.userId })

          return resolveUser(user)
        },
      }))
    },
  }
}

// ...
```

This approach easily scales creating a `resolvers` function on your project with an `index.js` file from where you can import your resolvers among the codebase. You can even recursively stack them to have a tree of resolvers making function calls between them.

There are considerations, however, that must be taken into account when implementing a design like this:

* What we do when the attributes are an array of documents to resolve? How we handle this without having to append multiple `Array.map()` calls or `for` loops?

* How we pass the AST and the context down from the parent node to the children?

* How we handle pagination? [There's an standard for doing this](https://facebook.github.io/relay/graphql/connections.htm) called Relay. However, we would like only to define the resolver for the schema itself and have an automated way of scaling this schema to the Relay specification.

All these issues can be easily solved implementing a function with the following prototype: `resolve(attributes, { using , ast, ctx })` where `using` is the resolver to be called, also in charge of setting properties like `__typename` for introspection.

We'll discuss the implementation of a function like this one on a future post as well as a possible scalable solution for pagination.

### Malicious Actors Abusing Nesting

When deploying a GraphQL backend to production, all the possible combinations of schemas become accessible, thus allowing things like:

```graphql
query {
  posts(first: 10) {
    comments {
      user {
        posts {
          comments {
            user {
              posts {
                comments {
                  user {
                    # and so on...
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

It's easy to see that this ends up taking down the data sources and opens a nearly-infinite set of possibilities to easily cause a DDoS on the backend service.

How can we counter this?

* Implement validations for nesting levels and query complexity. The JavaScript implementation of GraphQL backend already [comes bundled with a large set of rules](https://github.com/graphql/graphql-js/tree/master/src/validation/rules).

* Implement time outs for the query. If you're using an HTTP transport layer, is as simple as stacking a timeout in our server middleware. This can be easily implemented on JavaScript and Go.

However, instead of doing this, you should consider that **you should never expose your GraphQL directly on Internet-facing** backends, and you should not do it even in internal tools of a company.

When you query a GraphQL backend, you usually pass a JSON message like this one:

```json
{
  "operationName": "nameOfYourQuery",
  "query": "the query goes here...",
  "variables": {
    // Variables values go here
  }
}
```

The problem arises on passing the `query` field and interpreting it on demand. What you can do is ignore this field completely and store your queries on the server when deploying to production. With this approach:

* You lookup the queries on the server by `operationName` and load them when called.
* You can save some bandwidth completely removing the `query` entry from your client.

On development and staging tenancies, you still have complete control over the queries, and on production the system becomes a RPC that the client can use. The cost of this is the implementation complexity, since all the queries from the frontend must now be indexed and passed to the server before deploying.

Moreover:

* `operationNames` can change their query contents between deployments and this makes the system backwards-incompatible when the user ends up with an older client version.

* Thus, you need to generate a unique identifier, like `uuids` for each deployment. This means that on the build process you must replace the query names with the unique identifiers on the frontend side and find a way to readily have available the thousands of queries the server might end up handling after multiple deployments on larger projects.

* You might want to decouple the queries from the backend deployment, maybe requiring an in memory storage system for them without having to restart the backend when a new query is added.

This is what Facebook usually do: they assign each query a unique identifier and the client just calls this identifier plus the required variables. However, for small scale projects this might result an overkill.

We'll discuss multiple approaches on a future post.

### The $n+1$ Queries Problem

It's pretty common to have your GraphQL schemas representing different entities on a DBMS. Without thinking on any specific database technology, think of a simple blog that has the entities `Post` and `Comment`.

A common GraphQL query might be getting the list of the 100 latest comments, or the top 100 comments given a recommender algorithm. Your GraphQL query might look like this:

```graphql
query getLatestComments {
  latestComments(first: 100) {
    id
    author {
      firstName
      lastName
      email
    }
    comment
    date
    post {
      id
      title
      date
    }
  }
}
```

This query is bringing up the associated user for each comment, as well as each post. Leaving the implementation language aside, you might notice that, without any optimization, you might need to perform:

1.  A query for bringing the top 100 comments.

2.  **For each comment**, query the database to get the author profile.

3.  **For each comment**, query the database to get the associated post.

This results in at most $1 + 100 + 100 = 200$ queries to the database, just for serving one user request! Scaling this to a small number of users means your database might start having bottlenecks quickly. Even though this is an issue that RESTful APIs also has to deal with, here it seems more prone to happen, since the API consumer (your frontend developer or a malicious actor) has infinite possibilities to query the backend.

So, contrary to how RESTful APIs handle this, how we can propose a solution that:

* Is agnostic of your data source (this is why I'm ignoring [Join Monster](https://github.com/stems/join-monster) in this article). Can be a SQL database, a Mongo database, or even a API when you're orchestrating microservices.

* Is automated enough. You shouldn't be thinking of this each time you add a new value to your GraphQL backend schema.

* Is simple yet elegant.

A better approach for bringing up the data described above can be:

1.  Query the top 100 comments.

2.  For each comment, get the associated author identifier in a list.

3.  For each comment, get the associated post identifier in a list.

4.  On a single query, bring up all the authors within the list of IDs. Here's an example on two DBMS:

    ```sql
    SELECT
      author.first_name AS firstName,
      author.last_name AS lastName,
      author.email AS email
    FROM users AS author
    WHERE author.id IN (?)
    ```

    where `?` is the list of author IDs.

    You can do the same in Mongo:

    ```javascript
    db
      .collection('Users')
      .find({
        id: {
          $in: [...]
        }
      })
    ```

    where `...` should be replaced with the list of Author IDs.

5.  Do the same for the list of posts.

6.  Re-map each result to each comment. If the comment has author ID `x`, you should associate this JSON response to the author with ID `x` you retrieved from the database.

This approach is well known in the community and is called **batching**. We've moved from $201$ queries to just $3$. However, the question that arises is: how do we implement this in a reusable fashion?

Here Facebook $-$once again$-$ comes with a library called [Dataloader](https://github.com/facebook/dataloader), written in JavaScript. However, there are also implementations in [Ruby](https://github.com/sheerun/dataloader), [Python](http://docs.graphene-python.org/en/latest/execution/dataloader/), [Elixir](https://github.com/absinthe-graphql/dataloader), [Haskell](https://github.com/facebook/Haxl) and even our old friends [PHP](https://github.com/overblog/dataloader-php) and [Java](https://github.com/graphql-java/java-dataloader).

These libraries work based on the same premise: for each relation create something called the **loader**. A loader is an asynchronous function which accepts a list of elements and for each position returns, when resolves, the associated element that should be load.

In the case of our authors, it can be as follows in JavaScript:

```javascript
import Dataloader from 'dataloader'
import mysql from './db/mysql'

async function usersLoaderFunction(userIds) {
  const [result] = await mysql.query(
    `
    SELECT
      author.id AS id,
      author.first_name AS firstName,
      author.last_name AS lastName,
      author.email AS email
    FROM users AS author
    WHERE author.id IN (?)
  `,
    [userIds]
  )

  // For each user Ids, finds in the list of
  // results the one that has the same
  // id as the iteratee.
  return userIds.map(userId => result.find(({ id }) => userId === id))
}

export default usersLoaderFunction
```

When you call `usersLoader([3, 6, 20])`, the function is expected to return a list with 3 elements, each one containing the object that represents that particular user. Exporting `new Dataloader(userLoader)` creates the loader itself, which can be used as follows:

```javascript
import Dataloder from 'dataloader'
import usersLoaderFunction from './loaders/user'

const usersLoader = new Dataloader(usersLoaderFunction)

async function test() {
  const user1 = await usersLoader.load(3)
  const user2 = await usersLoader.load(6)
}

test()
```

Which happens here is that, ignoring precise details, every time the function is left off because of a blocking assignment (in this case, on the fourth line inside `test()`), the loader detects this and perform the loading calling your `usersLoaderFunction`.

When this truly shines? **When you need to load at the same time multiple users**:

```javascript
import Dataloder from 'dataloader'
import usersLoaderFunction from './loaders/user'

const usersLoader = new Dataloader(usersLoaderFunction)

async function test() {
  const users = await Promise.all([
    usersLoader.load(3),
    usersLoader.load(6),
    usersLoader.load(20),
  ])
}

test()
```

These three lines won't be loaded in series, but instead all of them will be called at the same time. After that, the promise is left blocking, thus the Dataloader has the ids `3`, `6` and `20` on the queue to load, **calling just once your `usersLoaderFunction` with the array `[3, 6, 20]`**!

Moreover, your Dataloader buddy also does this things for you:

* If it has an ID more than once in the query, gets the unique list of elements for you. If you call `usersLoad.load(3)` more than once on a same tick, you'll see it just once on your `usersLoaderFunction`.

* It has a cache. If, in another section of your code below you end up loading the user with ID 3, it will come from the cache and won't be loaded again. _For this reason, loaders should be created per-request **and not on the global scope of your codebase.**_

How can this be used in GraphQL? Going back to the example, for each comment you resolve, you can add in the resolved object something like this:

```javascript
import Dataloder from 'dataloader'
import usersLoaderFunction from './loaders/user'

async function resolveComments(comments) {
  // NOTE! This is now inside the function, because this
  // function will be called per request. You don't want
  // the loader to handle the caching of results.
  const usersLoader = new Dataloader(usersLoaderFunction)

  return comments.map(comment => ({
    ...comment,
    async author() {
      const author = await usersLoader.load(comments.authorId)

      // Do any other voodoo ops you might need here...

      return author
    },
  }))
}

export default resolveComments
```

You're expected to be calling this function with your comments results, and it'll handling the process of batching the users. With this solution, your `usersLoaderFunction` will be only called once, and with an unique list of user Ids.

In a future post we'll discuss a pattern to implement this in a scalable fashion. But at the moment, the conclusion is you can use this library to implement batching, leaving to yourself only the process of implementing the loader function contents! The loader contents can be an API call, a database call, a file reading, whatever you need!

## Logging and Testing

It's essential to monitor your GraphQL API in order to spot performance bottle necks and inspecting bugs. However, in comparison to a RESTful API, this is no simple process since queries and can be large and (1) passing them to a logging sidecar can result on a network bottleneck and (2) storing them in indexes like ElasticSearch can be expensive.

At the end of the day this means that logging does not end up being simple.

As discussed on the section above, queries come on an HTTP transport layer with the `operationName` key, which names the query. This query name in conjunction with a signature of the variables can be stored on the database and can be easily accomplished using middleware on the server processing chain.

The problem that might arise is that if you're processing the `query` received on a JSON param, the contents between two queries with the same `operationName` might be different, resulting in incorrect metrics, and making the debugging process harder. However, if the queries are stored on the server side as discussed above, this issue can be mitigated and the system will work as expected.

## Error Handling

On a system, properly handling errors is even more important than developing the happy path of your project. Improperly handled errors can be source of bad UX experience, hard debugging, low maintainability, data inconsistencies, process panics, and even self-triggered DDoS.

When you provide a user a form, you'll usually want to validate the user inputs on the frontend side as well as on the backend side. On the backend side, when a validation fails, it's usually expected to send an error to the frontend and draw this error on screen.

People with a Ruby on Rails background will surely know how easy is to accomplish these using `erb` templates, where the system immediately display errors on a field basis.

Implementing this in GraphQL, however, is more complex, because usually form submitting is represented as a mutation, and when one of the inputs fail, is hard to target it. This means that a way to display validation errors indicating each field must be provided, where GraphQL only enables showing an `errors` array accumulating all the exceptions caught during the query rendering.

I'm personally finding yet an extensible way to accomplish this on complex inputs like nested data or arrays in a way that is decoupled from the models underlying the schema definitions. [This article](https://medium.com/@tarkus/validation-and-user-errors-in-graphql-mutations-39ca79cd00bf) seem to be a good starting point.

However, the article (1) uses `validator.js` to validation mutation inputs, when, in some cases, validations are expected on models and not on the endpoints and (2) is too implementation specific, when I'm personally looking for a semantic way of accomplishing this more than the details.

As I develop a way for handling this easily, I'll discuss it on a future post.

## What About The Good Things?

Leaving the complexity aside, there are multiple benefits from using GraphQL that come out of the box:

* When defining the schemas, you automatically define the type of each field and you can easily attach comments on the definition. This way, GraphQL schemas are easier to document in comparison to RESTful APIs, even when using JSON Schema or Swagger.

* Similarly, when defining types, you can automatically enforce fields to be present or be non nullable, thus having presence validations (the most common type) out of the box.

* When defining an schema, you leave up to the frontend team to ask for the fields they need. If more fields are required in the future, you can easily add them on the backend without breaking compatibility. This increases maintainability heavily.

* When using proper tools like resolvers and Dataloaders, querying multiple data sources come in a simple and lightweight fashion. This is usually results more complex to implement on RESTful APIs and is a source of multiple conflicts when different teams have different requirements for an endpoint.

## Conclusion

As seen throughout the post, GraphQL is an interesting data-source and transport-layer agnostic query language that gives great levels of plasticity for frontend development and subsystems communications.

However, when developing a production-ready system, specially Internet facing solutions, multiple implementation complexities arise in order to deliver a secure, maintainable and scalable products.

**All of the issues have a solution,** as we've seen throughout this post. However, solving them require a full comprehension of the architecture of a GraphQL system. This means that there are no usual cookie-cutter solutions for implementing the backend, and the developer has a bigger cognitive load when implementing endpoints.

For small projects, GraphQL ends up being an overkill in comparison to RESTful APIs. For large projects, however, there are multiple benefits that make it a better solution than REST, including performance, maintainability and scalability. This is specially true when the project you're working on includes multiple data sources. In these cases, the effort of the implementation might be worthy.

In future posts I'll expand many of the ideas discussed here, regarding architecture, design and implementation of these ideas. Moreover, there are **multiple** issues not covered here, like authorization on a field level basis or querying only the required fields on a database. My plan is to expand these ideas as I find solutions to them.

GraphQL development is one of my greatest interests at the moment, so I'm completely open to feedback on this post, to answer questions and expand ideas on further posts as you request. We can continue this conversation on the comments below.

Thank you for your attention 🙌🏻!
