<script lang="js">
let hook = {}

/**
 * Clase para obtener ubicación de mi api de geolocalización
 */
export class GetLocation {
  static async getData() {
    try {
      const response = await fetch('https://solid-geolocation.vercel.app/location')
      const data = await response.json()
      return data
    } catch (err) {
      console.error('No se puede obtener datos de la api', err)
    }
  }
  // Se obtiene la latitud y longitud de la api del navegador para inyectar en la api
  static async currentPosition() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            hook.lat = latitude
            hook.lon = longitude
            resolve(hook)
          },
          (error) => {
            reject(error)
          }
        )
      } else {
        reject(new Error('Geolocalización no está soportada por este navegador'))
      }
    })
  }

  static async lat() {
    const data = await this.currentPosition()
    return data.latitude
  }

  static async lon() {
    const data = await this.currentPosition()
    return data.longitude
  }

  static async ip() {
    const data = await this.getData()
    return data.ip
  }

  static async city() {
    const data = await this.getData()
    return data.city.name
  }

  static async flag() {
    const data = await this.getData()
    return data.country.emoji_flag
  }

  static async country() {
    const data = await this.getData()
    return data.country.name
  }
}
</script>
