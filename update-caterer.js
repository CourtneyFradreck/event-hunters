const fs = require('fs');
let code = fs.readFileSync('src/app/caterer/[id].tsx', 'utf8');

// Replace Hero photo text label with Image
code = code.replace(
  /<View style=\{styles\.photoLabelBox\}>[\s\n]*<Text style=\{styles\.photoLabelText\}>\{caterer\.photo\}<\/Text>[\s\n]*<\/View>/,
  "<Image source={{ uri: caterer.photo }} style={StyleSheet.absoluteFillObject} />"
);

// Add overflow hidden to hero area so the image respects the border radius at the bottom
code = code.replace(/heroArea: \{([^}]+)\}/, "heroArea: {$1, overflow: 'hidden'}");

// Replace Gallery text labels with Images
code = code.replace(
  /<View key=\{idx\} style=\{styles\.galleryItem\}>[\s\n]*<View style=\{styles\.galleryLabelBox\}>[\s\n]*<Text style=\{styles\.galleryLabelText\}>\{g\}<\/Text>[\s\n]*<\/View>[\s\n]*<\/View>/g,
  "<View key={idx} style={[styles.galleryItem, { overflow: 'hidden' }]}><Image source={{ uri: g }} style={StyleSheet.absoluteFillObject} /></View>"
);

fs.writeFileSync('src/app/caterer/[id].tsx', code);
