<script lang="js">
import { supabase } from '@/lib/supabaseClient'
import { z } from 'zod'

export class Model {
  static async getComment() {
    try {
      const response = await fetch(
        'https://supabase-rest-api.vercel.app/supabase/?from=portfolio_comments&select=*',
        { method: 'GET', mode: 'cors', headers: { 'Content-Type': 'application/json' } }
      )
      if (!response.ok) throw new Error(`Cannot get data from API ${response.statusText}`)
      const data = await response.json()
      console.log({ data })
      return data
    } catch (err) {
      console.error('Error al obtener comentarios: ', err)
    }
  }

  static async sendComment(schema, data, errors, onCreate) {
    try {
      schema.parse(data)

      const { error } = await supabase.from('portfolio_comments').insert([data])

      if (error) {
        console.error(`Error submitting form: ${error.message}`)
      } else {
        errors = {}
      }

      await onCreate()
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          errors.value[err.path[0]] = err.message
        })
      }
    }
  }

  static async sendVisit(obj) {
    try {
      const { data, error } = await supabase.from('double_commit_visits').insert([obj])
      if (error) {
        console.error('Error al enviar datos: ', error.message)
      }
      return data
    } catch (err) {
      console.error('Error al enviar la visita: ', err)
    }
  }

  static async getVisits({ column }, limit) {
    try {
      const { data, error } = await supabase
        .from('double_commit_visits')
        .select(column)
        .order('id', { ascending: false })
        .limit(limit)

      if (error) return console.error('Error al recibir los datos de la visita: ', error.message)
      return data
    } catch (err) {
      console.error('Error al obtener las visitas: ', err)
    }
  }

  static async update(id, { content }) {
    try {
      const { error } = await supabase.from('portfolio_comments').update(content).match(id)

      if (error) return console.error('Error al actualizar comentarios', error.message)
    } catch (err) {
      console.error('Error al actualizar comentario: ', err)
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase.from('portfolio_comments').delete().eq('id', id)

      if (error) {
        console.error('Error al borrar comentario: ', error.message)
        return
      }

      return { success: true }
    } catch (err) {
      console.error('Error al eliminar comentario: ', err)
    }
  }
}
</script>
