const prisons = {
  'alcalameco-mujeres': {
    address: 'Centro Penitenciario\nMadrid I, Mujeres\nCtra. Alcalá-Meco, km 4,5\n28805 Alcalá de Henares, Madrid',
    shortname: 'Alcalá-Meco'
  },
  'estremera': {
    address: 'Centro Penitenciario\nMadrid VII\nCtra. M-241, km 5.750\n28595 Estremera, Madrid',
    shortname: 'Estremera'
  },
  'sotodelreal': {
    address: 'Centro Penitenciario\nMadrid V\nCtra. M-609, km 43,5\n28791 Soto del Real, Madrid',
    shortname: 'Soto del Real'
  }
}

const prisonersList = [
    {
      name: 'Meritxell Borràs', prison: 'alcalameco-mujeres', image: 'images/meritxellborras.png',
      description: 'Consellera de Governació, Administracions Públiques i Habitatge de la Generalitat de Catalunya',
      gender: 'f'
    }, {
      name: 'Dolors Bassa', prison: 'alcalameco-mujeres', image: 'images/dolorsbassa.png',
      description: ' Consellera de Treball, Afers Socials i Famílies de la Generalitat de Catalunya',
      gender: 'f'
    }, {
      name: 'Joaquim Forn', prison: 'estremera', image: 'images/joaquimforn.png',
      description: 'Conseller d\'Interior de la Generalitat de Catalunya',
      gender: 'm'
    }, {
      name: 'Jordi Turull', prison: 'estremera', image: 'images/jorditurull.png',
      description: 'Conseller de la Presidència de la Generalitat de Catalunya',
      gender: 'm'
    }, {
      name: 'Josep Rull', prison: 'estremera', image: 'images/joseprull.png',
      description: 'Conseller de Territori i Sostenibilitat de la Generalitat de Catalunya',
      gender: 'm'
    }, {
      name: 'Raül Romeva', prison: 'estremera', image: 'images/raulromeva.png',
      description: 'Conseller d\'Afers Exteriors, Relacions Institucionals i Transparència de la Generalitat de Catalunya',
      gender: 'm'
    }, {
      name: 'Oriol Junqueras', prison: 'estremera', image: 'images/orioljunqueras.png',
      description: 'Vicepresident de la Generalitat de Catalunya',
      gender: 'm'
    }, {
      name: 'Carles Mundó', prison: 'estremera', image: 'images/carlesmundo.png',
      description: 'Conseller de Justícia de la Generalitat de Catalunya',
      gender: 'm'
    }, {
      name: 'Jordi Sánchez', prison: 'sotodelreal', image: 'images/jordisanchez.png',
      description: 'President de l\'Assemblea Nacional Catalana',
      gender: 'm'
    }, {
      name: 'Jordi Cuixart', prison: 'sotodelreal', image: 'images/jordicuixart.png',
      description: 'President d\'Òmnium Cultural',
      gender: 'm'
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
  saveSelection(p)
  console.log(p)
  console.log(p.prison)

  const prison = prisons[p.prison]
  console.log(prison)

  $('.prisonerName').text(p.name)
  if (p.gender == 'm')
    $('.prisonerGenedredPrisoner').text('presoner')
  else
    $('.prisonerGenedredPrisoner').text('presonera')
  $('.prisonerImage').attr('src', p.image)
  $('.prisonerAddress').html(prison.address.replace(/\n/g, '<br>'))
  $('.prisonerPrisonShortname').text(prison.shortname)
  $('.prisonerDescription').text(p.description)

  $('.prisonerContainer').removeClass('invisible')

  return p
}
