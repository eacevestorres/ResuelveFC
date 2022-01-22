const { golesEquipos, bonosTotales, newFile } = require("./sueldoCompleto");
const fs = require("fs").promises;

describe("pruebas", () => {
    let equipos;
    let infoJugadores;
    it('Leemos el archivo', async () => {
        const jugadores = await fs.readFile("jugadores.json");
        infoJugadores = JSON.parse(jugadores);
    });
    it("Sumamos los goles de los equipos correctamente", () => {
        equipos = golesEquipos(infoJugadores);
        expect(equipos.rojo.goles).toBe(28);
        expect(equipos.azul.goles).toBe(37);
    });
    it("Sumamos los bonos totales de cada jugador", () => {
        expect(infoJugadores.jugadores[0].sueldo_completo).toBeFalsy();
        infoJugadores = bonosTotales(infoJugadores, equipos);
        expect(infoJugadores.jugadores[0].sueldo_completo).toBe(65333.33);
    });
    it("Se debio crear un archivo con la informacion de los bonos", async () => {
        try { await fs.unlink("./newJugadores.json"); } catch(err){}
        await newFile(infoJugadores);
        expect(await fs.stat("./newJugadores.json")).toBeTruthy();
    })
}); 