const fs = require('fs');
const jugadores = fs.readFileSync('jugadores.json');
const infoJugadores = JSON.parse(jugadores);
const equipos = {};

var golesEquipos = function () {
    for (var i = 0; i < infoJugadores.jugadores.length; i++) {
        const goles = infoJugadores.jugadores[i].goles
        const equipo = infoJugadores.jugadores[i].equipo
        if (!equipos[equipo]) {
            equipos[equipo] = { goles: goles };
        } else {
            equipos[equipo].goles += goles;
        }
    }
};
var bonosTotales = function () {
    for (var i = 0; i < infoJugadores.jugadores.length; i++) {
        const sueldo = infoJugadores.jugadores[i].sueldo
        const nivel = infoJugadores.jugadores[i].nivel
        const goles = infoJugadores.jugadores[i].goles
        const bonoIdv = infoJugadores.jugadores[i].bono
        const goles_minimos = infoJugadores.jugadores[i].goles_minimos
        const equipo = infoJugadores.jugadores[i].equipo
 //goles_minimos lo estoy tomando en cuenta como el divisor para obtener el procentaje de goles por jugador,
 // porque asi se utiliza en el ejemplo y tambien entiendo que el divisor para el % del bono de equipo es 50.
        switch (bonoIdv != null) {
            case nivel === "A":
                PGolesIdv = goles / 5 ;
                PGolesEquipo = equipos[equipo].goles / 50 ;
                PGolesSumados = PGolesEquipo + PGolesIdv;
                sueldoCompleto = (PGolesSumados/2 * bonoIdv + sueldo);
                infoJugadores.jugadores[i].sueldo_completo = sueldoCompleto;
                break;
            case nivel === "B":
                PGolesIdv = goles / 10 ;
                PGolesEquipo = equipos[equipo].goles / 50 ;
                PGolesSumados = PGolesEquipo + PGolesIdv;
                sueldoCompleto = (PGolesSumados/2 * bonoIdv + sueldo);
                infoJugadores.jugadores[i].sueldo_completo = sueldoCompleto;
                break;
            case nivel === "C":
                PGolesIdv = goles / 15 ;
                PGolesEquipo = equipos[equipo].goles / 50 ;
                PGolesSumados = PGolesEquipo + PGolesIdv;
                sueldoCompleto = (PGolesSumados/2 * bonoIdv + sueldo);
                infoJugadores.jugadores[i].sueldo_completo = sueldoCompleto;
                break;
            case nivel === "Cuauh":
                PGolesIdv = goles / 20 ;
                PGolesEquipo = equipos[equipo].goles / 50 ;
                PGolesSumados = PGolesEquipo + PGolesIdv;;
                sueldoCompleto = (PGolesSumados/2 * bonoIdv + sueldo);
                infoJugadores.jugadores[i].sueldo_completo = sueldoCompleto;
                break;
            default: //Este default funciona para los que no tienen clasificacion y traen su propio goles_minimos.
                PGolesIdv = goles / goles_minimos 
                PGolesEquipo = equipos[equipo].goles / 50
                PGolesSumados = PGolesEquipo + PGolesIdv
                sueldoCompleto = (PGolesSumados/2 * bonoIdv + sueldo)
                infoJugadores.jugadores[i].sueldo_completo = sueldoCompleto
                break;        
        }
    }
};

var newFile = function () {
    console.log (infoJugadores);
    const newjugadores = JSON.stringify(infoJugadores, null, 2);
    fs.writeFile(`./newjugadores.json`, newjugadores, 'utf8', function (err) {
        console.log("newJugadores.json file created!")
        if (err) {
            return console.log(err);
        }
    })
};

golesEquipos();
bonosTotales();
newFile();