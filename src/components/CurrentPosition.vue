<script lang="js">
let hook = {}

/**
 * Clase para obtener ubicación de la api geolocation.microlink.io y desde la
 * api de openweather para obtener una ubicación más precisa
 */
export class GetLocation {
  static async getData() {
    // const response = await fetch('https://geolocation.microlink.io/') <-- deprecated url
    const response = await fetch('https://solid-geolocation.vercel.app/location')
    const data = await response.json()
    return data
  }
  // Se obtiene la latitud y longitud de la api del navegador para inyectar en la api del clima así
  // obtener la ubicación más precisa (Encontré este pequeño hack a la api del clima 🙂)
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
    return data.lat
  }

  static async lon() {
    const data = await this.currentPosition()
    return data.lon
  }

  // Obtengo los datos del clima según la latitud y longitud
  //  Con éste truquito me permite obtener una ubicación más precisa y también los datos del clima
  static async apiData() {
    const lat = await this.lat()
    const lon = await this.lon()
    const url = `https://solid-geolocation.vercel.app/weather?latitude=${lat}&longitude=${lon}`
    const res = await fetch(url)
    const data = res.json()
    return data
  }
  // Se obtiene la ip de la api de microlink
  static async ip() {
    const data = await this.getData()
    return data.ip
  }
  /**
   * Utilizo el operador nullish ?? para utilizar uno u otro
   * Según si el usuario permite la geolocalización del navegador, si no lo permite
   * se usa geolocation.microlink de todas formas
   */
  static async city() {
    const data = (await this.apiData()) ?? (await this.getData())
    return data.name ?? data.city.name
  }

  static async flag() {
    const data = await this.getData()
    return data.country.flag.small
  }
  /**
   * Fuente para información sobre uso de expresiones regulares:
   * https://regex101.com/
   */
  static async country() {
    const data = await this.apiData()
    return data.country.name
  }
}
</script>
