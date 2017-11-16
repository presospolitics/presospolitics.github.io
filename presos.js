const prisons = {
  'alcalameco-mujeres': {
    address: 'Centro Penitenciario Madrid I, Mujeres\nCtra. Alcalá-Meco, km 4,5\n28803 Alcalá de Henares, Madrid',
    shortname: 'Alcalá-Meco'
  },
  'estremera': {
    address: 'Centro Penitenciario Madrid VII, Estremera\nCtra. M-241, km 5.750\n28595 Estremera, Madrid',
    shortname: 'Estremera'
  },
  'sotodelreal': {
    address: 'Centro Penitenciario Madrid V, Soto del Real\nCtra. M-609, km 3,5\n28791 Soto del Real, Madrid',
    shortname: 'Soto del Real'
  }
}

const prisonersList = [
    {
      name: 'Meritxell Borràs', prison: 'alcalameco-mujeres', image: 'images/meritxellborras.png',
      description: 'Consellera de Governació, Administracions Públiques i Habitatge de la Generalitat de Catalunya',
      gender: 'f', addressExtra: ''
    }, {
      name: 'Dolors Bassa', prison: 'alcalameco-mujeres', image: 'images/dolorsbassa.png',
      description: ' Consellera de Treball, Afers Socials i Famílies de la Generalitat de Catalunya',
      gender: 'f', addressExtra: ''
    }, {
      name: 'Joaquim Forn', prison: 'estremera', image: 'images/joaquimforn.png',
      description: 'Conseller d\'Interior de la Generalitat de Catalunya',
      gender: 'm', addressExtra: 'Módulo 1\n'
    }, {
      name: 'Jordi Turull', prison: 'estremera', image: 'images/jorditurull.png',
      description: 'Conseller de la Presidència de la Generalitat de Catalunya',
      gender: 'm', addressExtra: 'Módulo 4\n'
    }, {
      name: 'Josep Rull', prison: 'estremera', image: 'images/joseprull.png',
      description: 'Conseller de Territori i Sostenibilitat de la Generalitat de Catalunya',
      gender: 'm', addressExtra: 'Módulo 4\n'
    }, {
      name: 'Raül Romeva', prison: 'estremera', image: 'images/raulromeva.png',
      description: 'Conseller d\'Afers Exteriors, Relacions Institucionals i Transparència de la Generalitat de Catalunya',
      gender: 'm', addressExtra: 'Módulo 1\n'
    }, {
      name: 'Oriol Junqueras', prison: 'estremera', image: 'images/orioljunqueras.png',
      description: 'Vicepresident de la Generalitat de Catalunya',
      gender: 'm', addressExtra: 'Módulo 7\n'
    }, {
      name: 'Carles Mundó', prison: 'estremera', image: 'images/carlesmundo.png',
      description: 'Conseller de Justícia de la Generalitat de Catalunya',
      gender: 'm', addressExtra: 'Módulo 7\n'
    }, {
      name: 'Jordi Sánchez', prison: 'sotodelreal', image: 'images/jordisanchez.png',
      description: 'President de l\'Assemblea Nacional Catalana',
      gender: 'm', addressExtra: 'Módulo 4 Celda 213\n'
    }, {
      name: 'Jordi Cuixart', prison: 'sotodelreal', image: 'images/jordicuixart.png',
      description: 'President d\'Òmnium Cultural',
      gender: 'm', addressExtra: 'Módulo 1 Celda 203\n'
    },
]

function getHashFromPrisoner(p) {
  return sha256(p.name)
}

const prisonersHash = prisonersList.reduce(
  function(map, p) {
    map[getHashFromPrisoner(p)] = p
    return map
  }, {})

//var _i = 0;
function getRandomPrisoner() {
  //_i = (_i + 1) % prisonersList.length
  //return prisonersList[_i]
  return prisonersList[Math.floor(Math.random() * prisonersList.length)]
}

function saveSelection(prisoner) {
  Cookies.set('prisonerHash', getHashFromPrisoner(prisoner))
}

function clearSelection() {
  Cookies.remove('prisonerHash')
}

function recoverSelection() {
  return prisonersHash[Cookies.get('prisonerHash')]
}

function tria() {
  const p = recoverSelection() || getRandomPrisoner()
  //const p = getRandomPrisoner()
  saveSelection(p)
  console.log(p)
  console.log(p.prison)

  const prison = prisons[p.prison]
  console.log(prison)

  const address = p.addressExtra + prison.address;

  $('.prisonerName').text(p.name)
  if (p.gender == 'm')
    $('.prisonerGenedredPrisoner').text('presoner')
  else
    $('.prisonerGenedredPrisoner').text('presonera')
  $('.prisonerImage').attr('src', p.image)
  $('.prisonerAddress').html(address.replace(/\n/g, '<br>'))
  $('.prisonerPrisonShortname').text(prison.shortname)
  $('.prisonerDescription').text(p.description)

  $('.prisonerContainer').removeClass('invisible')

  return p
}
