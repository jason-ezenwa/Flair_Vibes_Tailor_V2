export default class homeController {
  /**
   * says welcome to flair vibes tailor
   * and is called by a cron job every 14 minutes to keep the application running 
   * preventing the render app from sleeping after 15 minutes of inactivity
   */
  static async home(request, response) {
    return response.status(200).send("Welcome to Flair Vibes Tailor");
  }
}