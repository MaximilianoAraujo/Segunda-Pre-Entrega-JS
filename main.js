// Simulador de sistema de alumnos y notas
// Queria validar algunos datos ingresados por prompt para que no se pudieran ingresar valores no validos (como por ejemplo no poder ingresar numeros al querer ingresar un nombre) pero no logre hacerlo funcionar.

class Alumno {
    constructor(nombre, apellido, legajo, notaParcial1, notaParcial2, notaParcial3) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.legajo = legajo;
        this.notaParcial1 = notaParcial1;
        this.notaParcial2 = notaParcial2;
        this.notaParcial3 = notaParcial3;
    }
};

const alumno1 = new Alumno("Maximiliano", "Araujo", 126773, 7.50, 6, 9.25);
const alumno2 = new Alumno("Gabriela", "Obeso", 138942, 10, 4, 7.50);
const alumno3 = new Alumno("James", "Hetfield", 98588, 5.25, 6.50, 3);
const alumno4 = new Alumno("Leon", "Kennedy", 110246, 9, 8.75, 8);
const alumno5 = new Alumno("Feng", "Min", 127135, 2.5, 4, 4.50);

const listaDeAlumnos = [alumno1, alumno2, alumno3, alumno4, alumno5];


// Funcion para el menu principal
function menuPrincipal() {

    let opciones = 0;

    while (opciones !== 1 && opciones !== 2 && opciones !== 3 && opciones !== 4) {
        opciones = parseInt(prompt(`Ingrese una de las siguientes opciones:

        1) Registrar un nuevo alumno al sistema
        2) Eliminar un alumno registrado del sistema
        3) Modificar datos o notas de un alumno registrado
        4) Consultar nota final de un alumno`));

        if (opciones !== 1 && opciones !== 2 && opciones !== 3 && opciones !== 4) {
            alert("Opción ingresada no válida!");
        }
    }

    switch (opciones) {
        case 1:
            registrarAlumno();
            break;
        case 2:
            borrarAlumno();
            break;
        case 3:
            modificarAlumno();
            break;
        case 4:
            promedioDeNotas();
            break;
    }
};

// Funcion para el registro de alumno
function registrarAlumno() {

    let nombre = prompt("Ingrese el nombre del alumno a registrar:");

    let apellido = prompt("Ingrese el apellido del alumno a registrar:");

    let legajo = parseInt(prompt("Ingrese el número de legajo del alumno a registrar:"));

    let comprobacionLegajo = listaDeAlumnos.some(alumno => alumno.legajo === legajo);
    while (comprobacionLegajo) {
        legajo = parseInt(prompt("El número de legajo ingresado pertenece a un alumno ya registrado. Por favor, ingrese un número de legajo distinto."));
        comprobacionLegajo = listaDeAlumnos.some(alumno => alumno.legajo === legajo);
    }

    let parcial1 = parseFloat(prompt("Ingrese la nota del primer parcial:"));
    while (parcial1 < 1 || parcial1 > 10) {
        parcial1 = parseFloat(prompt("Error. Debe ingresar una nota entre 1 y 10."));
    }

    let parcial2 = parseFloat(prompt("Ingrese la nota del segundo parcial:"));
    while (parcial2 < 1 || parcial2 > 10) {
        parcial2 = parseFloat(prompt("Error. Debe ingresar una nota entre 1 y 10."));
    }

    let parcial3 = parseFloat(prompt("Ingrese la nota del tercer parcial:"));
    while (parcial3 < 1 || parcial3 > 10) {
        parcial3 = parseFloat(prompt("Error. Debe ingresar una nota entre 1 y 10."));
    }

    const nuevoAlumno = new Alumno(nombre, apellido, legajo, parcial1, parcial2, parcial3);
    listaDeAlumnos.unshift(nuevoAlumno);

    alert(`Se ha registrado al alumno exitosamente.\n\n
    Nombre Completo:  ${apellido} ${nombre} \n
    N° de Legajo:  ${legajo} \n
    Notas:  Parcial n°1 - ${parcial1}  |  Parcial n°2 - ${parcial2}  |  Parcial n°3 - ${parcial3}`);
};

// funcion para eliminar un alumno
function borrarAlumno() {

    let legajo = parseInt(prompt("Ingrese el número de legajo del alumno:"));

    let comprobacionLegajo = listaDeAlumnos.some(alumno => alumno.legajo === legajo);
    while (comprobacionLegajo === false) {
        legajo = parseInt(prompt("No se ha encontrado el número de legajo. Intentelo nuevamente."));
        comprobacionLegajo = listaDeAlumnos.some(alumno => alumno.legajo === legajo);
    }

    let eliminarAlumno = listaDeAlumnos.find(alumno => alumno.legajo === legajo);

    let indiceAlumno = listaDeAlumnos.indexOf(eliminarAlumno);

    listaDeAlumnos.splice(indiceAlumno, 1)

    alert("Se ha borrado al alumno del sistema exitosamente!");
}

// funcion para modificar un alumno
function modificarAlumno() {

    let continuar = true;

    let legajo = parseInt(prompt("Ingrese el número de legajo del alumno:"));

    let comprobacionLegajo = listaDeAlumnos.some(alumno => alumno.legajo === legajo);
    while (comprobacionLegajo === false) {
        legajo = parseInt(prompt("No se ha encontrado el número de legajo. Inténtelo nuevamente."));
        comprobacionLegajo = listaDeAlumnos.some(alumno => alumno.legajo === legajo);
    }

    let editarDatos = listaDeAlumnos.find(alumno => alumno.legajo === legajo);

    while (continuar) {
        let opcionesDatos = parseInt(prompt(`Ingrese una de las siguientes opciones para seleccionar el dato a modificar:

        1) Modificar Nombre
        2) Modificar Apellido
        3) Modificar Legajo
        4) Modificar Nota del primer parcial
        5) Modificar Nota del segunda parcial
        6) Modificar Nota del tercer parcial`));

        switch (opcionesDatos) {
            case 1:
                editarDatos.nombre = prompt("Ingrese el nuevo nombre:");
                break;

            case 2:
                editarDatos.apellido = prompt("Ingrese el nuevo apellido:");
                break;

            case 3:
                let nuevoLegajo = parseInt(prompt("Ingrese el nuevo numero de legajo:"));

                let legajoEnUso = listaDeAlumnos.some(alumno => alumno.legajo === nuevoLegajo);
                while (legajoEnUso) {
                    nuevoLegajo = parseInt(prompt("El número de legajo ingresado pertenece a un alumno ya registrado. Por favor, ingrese un número de legajo distinto."));
                    legajoEnUso = listaDeAlumnos.some(alumno => alumno.legajo === nuevoLegajo);
                }

                editarDatos.legajo = nuevoLegajo;
                break;

            case 4:
                editarDatos.notaParcial1 = parseFloat(prompt("Ingrese la nueva nota del primer parcial:"));
                while (editarDatos.notaParcial1 < 1 || editarDatos.notaParcial1 > 10) {
                    editarDatos.notaParcial1 = parseFloat(prompt("Error. Debe ingresar una nota entre 1 y 10."));
                }
                break;

            case 5:
                editarDatos.notaParcial2 = parseFloat(prompt("Ingrese la nueva nota del segunda parcial:"));
                while (editarDatos.notaParcial2 < 1 || editarDatos.notaParcial2 > 10) {
                    editarDatos.notaParcial2 = parseFloat(prompt("Error. Debe ingresar una nota entre 1 y 10."));
                }
                break;

            case 6:
                editarDatos.notaParcial3 = parseFloat(prompt("Ingrese la nueva nota del tercer parcial:"));
                while (editarDatos.notaParcial3 < 1 || editarDatos.notaParcial3 > 10) {
                    editarDatos.notaParcial3 = parseFloat(prompt("Error. Debe ingresar una nota entre 1 y 10."));
                }
                break;

            default:
                alert("Error! No ha ingresado un numero válido.");
                break;
        }

        continuar = confirm("¿Desea modificar otro dato?");

    }
}

// Funcion para promedio final
function promedioDeNotas() {

    let legajo = parseInt(prompt("Ingrese el numero de legajo del alumno:"));

    let comprobacionLegajo = listaDeAlumnos.some(alumno => alumno.legajo === legajo);
    while (comprobacionLegajo === false) {
        legajo = parseInt(prompt("No se ha encontrado el número de legajo. Inténtelo nuevamente."));
        comprobacionLegajo = listaDeAlumnos.some(alumno => alumno.legajo === legajo);
    }

    let calculoPromedio = listaDeAlumnos.find(alumno => alumno.legajo === legajo);

    let promedio = (calculoPromedio.notaParcial1 + calculoPromedio.notaParcial2 + calculoPromedio.notaParcial3) / 3;

    if (promedio < 4) {
        alert(`El promedio final es de ${promedio.toFixed(2)}.  El alumno no aprobó la materia.`);
    }
    else if (promedio >= 4 && promedio < 7) {
        alert(`El promedio final es de ${promedio.toFixed(2)}.  El alumno debe rendir un examen final.`);
    }
    else {
        alert(`El promedio final es de ${promedio.toFixed(2)}.  El alumno aprobó la materia.`);
    }
}

// Inicializacion del simulador
alert("Sistema Inicializado.");
menuPrincipal();
console.log(listaDeAlumnos);