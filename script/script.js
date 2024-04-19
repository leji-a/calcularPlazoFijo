function calcularPlazoFijo() {
    const monto = parseFloat(document.getElementById('monto').value);
    const dias = parseInt(document.getElementById('dias').value);
    const reinvertir = document.getElementById('reinvertir').checked;

    if (!validarEntradas()) return;

    let montoFinal = calcularMontoFinal(monto, dias);

    mostrarResultado(monto, dias, reinvertir);
}
function calcularPorcentaje(dias){
    if (dias >= 30 && dias <= 60){ 
        return 0.4
    } else if (dias >= 61 && dias <= 120){ 
        return 0.45
    } else if(dias >= 121 && dias <= 360){ 
        return 0.5
    } else if(dias > 360) {
        return 0.65 
    }
    return 0;
}
function validarEntradas() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const dias = parseInt(document.getElementById('dias').value);

    document.getElementById('errorNombre').textContent = '';
    document.getElementById('errorNombreNumero').textContent = '';
    document.getElementById('errorMonto').textContent = '';
    document.getElementById('errorDias').textContent = '';

    let error = false;

    if (nombre.trim() === '' || apellido.trim() === ''){
        document.getElementById('errorNombre').textContent = "El nombre y el apellido no pueden estar vacíos.";
        error = true;
    }
    if (!isNaN(nombre.trim()) || !isNaN(apellido.trim())){
        document.getElementById('errorNombreNumero').textContent = "El nombre y el apellido no pueden ser numeros.";
        error = true;
    }
    if (isNaN(monto) || monto < 1000){
        document.getElementById('errorMonto').textContent = "El monto debe ser mayor o igual a 1000.";
        error = true;
    }
    if(isNaN(dias) || dias < 30){
        document.getElementById('errorDias').textContent = "La cantidad de días debe ser mayor o igual a 30.";
        error = true;
    }

    return !error;
}
function calcularMontoFinal(monto, dias) {
    let porcentaje = calcularPorcentaje(dias);
    return monto + (monto * (dias / 360) * porcentaje);
}
function mostrarResultado(monto, dias, reinvertir) {
    
    document.getElementById('resultado').textContent = ''
    
    if (!reinvertir) {
        let montoFinal = calcularMontoFinal(monto, dias);
        document.getElementById('resultado').textContent = `El monto final a recibir es: ${montoFinal.toFixed(2)}`; 
    } else {
        let tabla = "<table><tr><th>Período</th><th>Monto Inicial</th><th>Monto Final</th></tr>";
        let montoInicial = monto;
        for (let i = 1; i <= 4; i++) {
            let montoFinal = calcularMontoFinal(montoInicial, dias);
            tabla += `<tr><td>${i}</td><td>${montoInicial.toFixed(4)}</td><td>${montoFinal.toFixed(4)}</td></tr>`;
            montoInicial = montoFinal;
        }
        tabla += "</table>";
        document.getElementById('resultado').innerHTML = tabla;
    }
}