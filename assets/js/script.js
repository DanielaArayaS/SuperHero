// Función para capturar la información ingresada por el usuario
function capturarInformacion() {
    let heroNumber = $('#heroNumber').val();
    return heroNumber;
  }
  
  // Función para realizar la consulta a la API
  function consultarAPI(heroNumber) {
    $.ajax({
      url: `https://www.superheroapi.com/api.php/25525300557057249/${heroNumber}`,
      method: 'GET',
      success: function(response) {
        mostrarInformacion(response); // Mostrar la información del superhéroe
        mostrarGrafico(response.powerstats); // Mostrar el gráfico de estadísticas del superhéroe
      },
      error: function(xhr, status, error) {
        alert('Ha ocurrido un error en la búsqueda. Por favor, intenta de nuevo.');
        console.error('Error en la solicitud:', error);
      }
    });
  }
  
  /// Función para mostrar la información del superhéroe en tarjetas de Bootstrap
function mostrarInformacion(superhero) {
    $('#heroDetails').html(`
      <div class="card">
        <div class="card-header">${superhero.name}</div>
        <div class="card-body">
          <img src="${superhero.image.url}" class="card-img-top" alt="${superhero.name}">
          <h5 class="card-title">Nombre: ${superhero.name}</h5>
          <p class="card-text">Conexiones: ${superhero.connections['group-affiliation']}</p>
          <p class="card-text">Publicado por: ${superhero.biography.publisher}</p>
          <p class="card-text">Ocupación: ${superhero.work.occupation}</p>
          <p class="card-text">Primera aparición: ${superhero.biography['first-appearance']}</p>
          <p class="card-text">Altura: ${superhero.appearance.height.join(' - ')}</p>
          <p class="card-text">Peso: ${superhero.appearance.weight.join(' - ')}</p>
          <p class="card-text">Alianzas: ${superhero.biography.aliases.join(', ')}</p>
        </div>
      </div>
    `);

    // Mostrar el gráfico de pastel después de mostrar la información del superhéroe
  mostrarGrafico(superhero.powerstats);
  }
  
  // Función para mostrar el gráfico de pastel con las estadísticas del superhéroe
  function mostrarGrafico(powerstats) {
    let stats = [
      { label: "Durabilidad", y: parseInt(powerstats.durability) || 0 },
      { label: "Velocidad", y: parseInt(powerstats.speed) || 0 },
      { label: "Fuerza", y: parseInt(powerstats.strength) || 0 },
      { label: "Inteligencia", y: parseInt(powerstats.intelligence) || 0 },
      { label: "Combate", y: parseInt(powerstats.combat) || 0 },
      { label: "Poder", y: parseInt(powerstats.power) || 0 }
    ];
  
    let options = {
      animationEnabled: true,
      title: {
        text: "Estadísticas del Superhéroe"
      },
      data: [{
        type: "pie",
        startAngle: 240,
        yValueFormatString: "##0",
        indexLabel: "{label} - #percent%",
        dataPoints: stats
      }]
    };
  
    $("#heroStatsChart").CanvasJSChart(options);
  }
  
  // Evento de envío del formulario
  $(document).ready(function() {
    $('#searchForm').submit(function(event) {
      event.preventDefault(); // Evita el envío del formulario por defecto
      
      let heroNumber = capturarInformacion(); // Captura la información ingresada por el usuario
      
      // Comprobar si el valor ingresado es un número
      if ($.isNumeric(heroNumber)) {
        consultarAPI(heroNumber); // Realiza la consulta a la API con la información capturada
      } else {
        alert('Por favor, ingresa solo números para el número del Super Héroe.');
      }
    });
  });
