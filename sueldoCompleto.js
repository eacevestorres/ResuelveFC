const fs = require("fs").promises;
//Aqui cuento los equipos y les sumo los goles de cada jugador a cada equipo.

const golesEquipos = (infoJugadores) => {
    // Leemos el archivo y aprovechamos a sumar los goles por equipos.
    let equipos = {};
    for (var i = 0; i < infoJugadores.jugadores.length; i++) {
        const goles = infoJugadores.jugadores[i].goles
        const equipo = infoJugadores.jugadores[i].equipo
        if (!equipos[equipo]) {
            equipos[equipo] = { goles: goles };
        } else {
            equipos[equipo].goles += goles;
        }
    }
    return equipos;
};
//Calculamos los bonos de cada jugador y modificamos el objeto jugadores.
const bonosTotales = (infoJugadores, equipos) => {
    for (var i = 0; i < infoJugadores.jugadores.length; i++) {
        const sueldo = infoJugadores.jugadores[i].sueldo
        const nivel = infoJugadores.jugadores[i].nivel
        const goles = infoJugadores.jugadores[i].goles
        const bonoIdv = infoJugadores.jugadores[i].bono
        const goles_minimos = infoJugadores.jugadores[i].goles_minimos
        const equipo = infoJugadores.jugadores[i].equipo
 //los goles minimos lo estoy tomando en cuenta como el divisor para obtener el procentaje de goles por jugador,
 // porque asi se utiliza en el ejemplo y tambien entiendo que el divisor para el % del bono de equipo es 50.
        switch (bonoIdv != null) {
            case nivel === "A":
                PGolesIdv = goles / 5 ;
                PGolesEquipo = equipos[equipo].goles / 50 ;
                PGolesSumados = PGolesEquipo + PGolesIdv;
                sueldoCompleto = (PGolesSumados/2 * bonoIdv + sueldo);
                infoJugadores.jugadores[i].sueldo_completo = Math.round(sueldoCompleto * 100)/100;
                break;
            case nivel === "B":
                PGolesIdv = goles / 10 ;
                PGolesEquipo = equipos[equipo].goles / 50 ;
                PGolesSumados = PGolesEquipo + PGolesIdv;
                sueldoCompleto = (PGolesSumados/2 * bonoIdv + sueldo);
                infoJugadores.jugadores[i].sueldo_completo = Math.round(sueldoCompleto * 100)/100;
                break;
            case nivel === "C":
                PGolesIdv = goles / 15 ;
                PGolesEquipo = equipos[equipo].goles / 50 ;
                PGolesSumados = PGolesEquipo + PGolesIdv;
                sueldoCompleto = (PGolesSumados/2 * bonoIdv + sueldo);
                infoJugadores.jugadores[i].sueldo_completo = Math.round(sueldoCompleto * 100)/100;
                break;
            case nivel === "Cuauh":
                PGolesIdv = goles / 20 ;
                PGolesEquipo = equipos[equipo].goles / 50 ;
                PGolesSumados = PGolesEquipo + PGolesIdv;;
                sueldoCompleto = (PGolesSumados/2 * bonoIdv + sueldo);
                infoJugadores.jugadores[i].sueldo_completo = Math.round(sueldoCompleto * 100)/100;
                break;
            default: //Este default funciona para los que no tienen clasificacion y traen su propio goles_minimos, el bonus.
                PGolesIdv = goles / goles_minimos 
                PGolesEquipo = equipos[equipo].goles / 50
                PGolesSumados = PGolesEquipo + PGolesIdv
                sueldoCompleto = (PGolesSumados/2 * bonoIdv + sueldo)
                infoJugadores.jugadores[i].sueldo_completo = Math.round(sueldoCompleto * 100)/100
                break;        
        }
    }
    return infoJugadores;
};
//Creamos un nuevo archivo con la informacion actualizada
var newFile = async (infoJugadores) => {
    const newJugadores = JSON.stringify(infoJugadores, null, 2);
    await fs.writeFile("./newjugadores.json", newJugadores, { encoding: "utf8"});
};

// golesEquipos();
// bonosTotales();
// newFile();

module.exports = {
    golesEquipos,
    bonosTotales,
    newFile,
};