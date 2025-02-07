<script lang="js">
import { z } from 'zod'

export class Model {
  static async getComment({ from, select, limit, orderBy }) {
    try {
      const response = await fetch(
        `https://supabase-rest-api.vercel.app/supabase/optional/?from=${from}&select=${select}&limit=%${limit}&order=${orderBy}`,
        { method: 'GET', mode: 'cors', headers: { 'Content-Type': 'application/json' } }
      )
      if (!response.ok) throw new Error(`Cannot get data from API ${response.statusText}`)
      const data = await response.json()

      return data
    } catch (err) {
      console.error('Error al obtener comentarios: ', err)
    }
  }

  static async sendComment({ schema, from, data, errors }) {
    try {
      schema.parse(data)

      const response = await fetch(`https://supabase-rest-api.vercel.app/supabase/?from=${from}`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const jsonData = await response.json()
      if (!response.ok) throw new Error(response.statusText)

      return { message: jsonData }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          errors.value[err.path[0]] = err.message
        })
      }
    }
  }

  static async sendVisit({ from, visit }) {
    try {
      const response = await fetch(`https://supabase-rest-api.vercel.app/supabase/?from=${from}`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visit)
      })
      if (!response.ok) throw new Error(response.statusText)
      const data = response.json()
      return data
    } catch (err) {
      console.error('Error al enviar la visita: ', err)
    }
  }

  static async getVisits({ from, select, limit, orderBy }) {
    try {
      const response = await fetch(
        `https://supabase-rest-api.vercel.app/supabase/optional/?from=${from}&select=${select}&limit=%${limit}&order=${orderBy}`,
        { method: 'GET', mode: 'cors', headers: { 'Content-Type': 'application/json' } }
      )
      if (!response.ok) throw new Error(`Cannot get data from API ${response.statusText}`)
      const data = await response.json()

      return data
    } catch (err) {
      console.error('Error al obtener las visitas: ', err)
    }
  }

  static async update({ from, data }) {
    try {
      const response = await fetch(`https://supabase-rest-api.vercel.app/supabase/?from=${from}`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw new Error(response.statusText)
      const jsonData = response.json()
      return jsonData
    } catch (err) {
      console.error('Error al actualizar comentario: ', err)
    }
  }

  static async delete({ from, id }) {
    try {
      const response = await fetch(`https://supabase-rest-api.vercel.app/supabase/${from}/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      if (!response.ok) throw new Error(response.statusText)

      return data
    } catch (err) {
      console.error('Error al eliminar comentario: ', err)
    }
  }
}
</script>
