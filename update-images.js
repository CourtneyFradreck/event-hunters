const fs = require('fs');
let data = fs.readFileSync('src/constants/data.ts', 'utf8');

const replacements = {
  'wedding buffet line': 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
  'sadza & relish tray': 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
  'plated main course': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
  'rice & chicken trays': 'https://images.unsplash.com/photo-1596683720379-b73ce17f9fe6?w=800&q=80',
  'buffet chafing dishes': 'https://images.unsplash.com/photo-1628294436579-22cb15ef2a70?w=800&q=80',
  'braai grill close-up': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
  'banquet hall setting': 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
  'chef plating dish': 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80'
};

for (const [oldPhoto, newPhoto] of Object.entries(replacements)) {
  data = data.replace(new RegExp(`photo: '${oldPhoto}'`, 'g'), `photo: '${newPhoto}'`);
}

data = data.replace(
  /gallery: \['plated main', 'buffet setup', 'beef stew pot', 'table styling'\]/g,
  `gallery: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
      'https://images.unsplash.com/photo-1628294436579-22cb15ef2a70?w=800&q=80',
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80'
    ]`
);

fs.writeFileSync('src/constants/data.ts', data);
