import React from 'react'
import Link, { withPrefix } from 'gatsby-link'
import { Table } from 'reactstrap'

import mat1610 from '../../attachments/puc/mat1610_compilado.pdf'
import mat1620 from '../../attachments/puc/mat1620_compilado.pdf'
import mat1630 from '../../attachments/puc/mat1630_compilado.pdf'
import mat1640 from '../../attachments/puc/mat1640_compilado.pdf'

import bessel from '../../attachments/puc/apuntes_bessel.pdf'
import proba from '../../attachments/puc/apuntes_proba.pdf'

const MathTab = () => (
  <div>
    <Table striped={true} hover={true} bordered={true}>
      <tr>
        <td className="p-4">
          <div>
            <a href={mat1610}>
              <strong>
                Apuntes y Problemas Resueltos de Cálculo I (MAT1610)
              </strong>
            </a>
          </div>
          <div>Segunda Versión</div>
        </td>
      </tr>
      <tr>
        <td className="p-4">
          <div>
            <a href={mat1620}>
              <strong>
                Apuntes y Problemas Resueltos de Cálculo II (MAT1620)
              </strong>
            </a>
          </div>
          <div>Primera Versión</div>
        </td>
      </tr>
      <tr>
        <td className="p-4">
          <div>
            <a href={mat1630}>
              <strong>
                Apuntes y Problemas Resueltos de Cálculo III (MAT1630)
              </strong>
            </a>
          </div>
          <div>Primera Versión</div>
        </td>
      </tr>
      <tr>
        <td className="p-4">
          <div>
            <a href={mat1640}>
              <strong>
                Apuntes y Problemas Resueltos de Ecuaciones Diferenciales
                (MAT1640)
              </strong>
            </a>
          </div>
          <div>
            <strong>Incompletos.</strong> Falta una revisión general y agregar
            la solución de algunos problemas. (Eventualmente) algún día los
            finalizaré, pero son útiles en su estado actual.
          </div>
        </td>
      </tr>
    </Table>

    <Table striped={true} hover={true} bordered={true}>
      <tr>
        <td className="p-4">
          <div>
            <a href={proba}>
              <strong>Apuntes de Probabilidades y Estadística (EYP1113)</strong>
            </a>
          </div>
          <div>
            Siempre se me olvidan los conceptos de este curso, y siempre termino
            recurriendo a ellos de alguna manera u otra, por lo que los uso como
            recordatorio mental.
          </div>
        </td>
      </tr>
      <tr>
        <td className="p-4">
          <div>
            <a href={bessel}>
              <strong>Apuntes de Funciones de Bessel</strong>
            </a>
          </div>
          <div>
            Importantes funciones para el estudio de problemas con simetrías
            cilíndricas.
          </div>
        </td>
      </tr>
    </Table>
  </div>
)

export default MathTab
