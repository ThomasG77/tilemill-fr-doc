# Introduction

TileMill est un outil pour les cartographes permettant concevoir rapidement et facilement des cartes pour le Web en utilisant des données personnalisées. Il est construit sur la base de la puissante librairie de rendu cartographique open-source [Mapnik](http://www.mapnik.org) - la même que celle qu'[OpenStreetMap](http://www.openstreetmap.org/) et [MapQuest]( http://www.mapquest.com) utilisent pour faire certaines de leurs cartes. TileMill n'est pas destiné à être un outil de cartographie généraliste, il se concentre plutôt sur la rationalisation et la simplification d'un certain nombre de cas d'utilisation.

Pour ceux qui viennent du milieu ou la cartographie ou des SIG, la plus grande provocation que fait TileMill est la projection finale - Les cartes TileMill sont en effet, toujours projetées en "Web Mercator. Comme son nom l'indique, cette projection est populaire avec les applications de cartographie web, et donc les cartes créées avec TileMill peuvent être affichées en utilisant l'API Google Maps, OpenLayers, et un certain nombre d'autres projets.

TileMill permet aussi d'exporter directement dans le format [MBTiles](http://www.mbtiles.org) basé sur le format de fichier SQLite. Ce format a été conçu pour mettre hors-ligne des cartes traditionnellement en ligne. Il est utilisé par les projets [Maps on a Stick](http://mapbox.com/tools/maps-stick) et [MapBox iPad App](http://mapbox.com/ipad).

TileMill est un projet de la société [Development Seed](http://www.developmentseed.org) et son code source est [disponible sur GitHub](http://github.com/mapbox/tilemill).

# Éléments de base

## Les SIG

Si vous n'avez jamais travaillé avec un SIG ou en cartographie avant, il y a un certain nombre de bases avant d''aller plus loin avec TileMill.

Un SIG signifie Système d'Information Géographique et fait référence à tous les système qui doivent enregistrer, analyser ou représenter des données relatives à une localisation. TileMill se concentre sur la partie ‘représentation’ de cette définition, mais il fournit quelques outils pour une analyse basique. La cartographie est l'activité de production de carte.

## Projections cartographiques

**Les projections** font références aux méthodes utilisées pour représenter un objet en trois dimensions comme la Terre sur une surface en deux dimensions comme une feuille de papier ou un écran d'ordinateur. Bien que les cartes TileMill soient toujours projetées en ‘Web Mercator’, il vous arrivera de croiser des sources de données qui utilisent [d'autres projections](http://en.wikipedia.org/wiki/Map_projection).

**Les coordonnées systèmes** fournissent un moyen de décrire un emplacement particulier sur Terre. Par exemple, vous pouvez indiquer la position de Washington, DC avec sa latitude et sa longitude approximatives `(38,-77)` Une autre manière de décrire cette position pourrait être d'indiquer le *nombre de mètres entre Washington, DC par rapport au nord et à l'est de l'équateur* - et certains systèmes de coordonnées fonctionnent exactement comme cela.

La **chaîne SRS de [proj4](http://trac.osgeo.org/proj/)** (Spatial Referencing System) combine ces deux concepts et fournit en même temps une description de la projection et des coordonnées système d'une source de données. Par exemple, la chaîne SRS de proj4 [WGS84](http://en.wikipedia.org/wiki/World_Geodetic_System) ressemble à ceci:

    +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs

TileMill peut généralement auto-détecter le SRS des shapefiles et d'autres sources de données. Vous devrez peut être fournir un SRS pour certaines sources de données si TileMill s'avère incapable de détecter correctement leur valeur.

## Niveaux de zoom

Interactives, les cartes tuilées sont conçues et générées à un certain nombre d'échelles différentes. Un niveau de zoom est une échelle prédéfinie à laquelle une carte est générée. OpenStreetMap, Google Maps, et la plupart des solutions de cartographie en ligne ont des niveaux de zoom qui sont échelonnés de façon que le monde entier soit compris dans une tuile de 256x256 pixels au zoom de niveau 0, et que la largeur et la hauteur double à chaque niveau de zoom supplémentaire.

Par exemple, au niveau du zoom 6, vous obtenez une vue complète d'un pays de taille moyenne. Au niveau de zoom 11, vous regardez une zone de taille métropolitaine. Au niveau Zoom 16, vous êtes descendu à l'échelle d'un quartier.

# Vue rapide de l'interface utilisateur

Si vous avez TileMill en cours d'exécution sur votre ordinateur, vous pouvez accéder à l'interface web dans n'importe quel navigateur moderne, à [http://localhost:8889](http://localhost:8889) (par défaut, cette adresse est configurable). L'écran principal permet de naviguer dans les projets, et vous verrez des exemples de projets qui vous permettront de vous faire des possibilités offertes par TileMill. Si vous cliquez sur un des projets, vous arriverez sur l'interface d'édition:

![Screenshot](http://tilemill.com/manual/project.png)

1. Barre de menu principale
2. Prévisualisation de carte
3. Liste des couches
4. Palettes des couleurs et des polices
5. Éditeur de code

### Barre d'outils principale

![Screenshot](http://tilemill.com/manual/toolbar.png)

1. Bouton de configuration
2. Nom du projet
3. Bouton de sauvegarde
4. Bouton d'export - exporte votre carte dans une image PNG ou dans un fichier MBTiles; vous pouvez aussi voir les exports antérieurs.
5. Configuration du projet - ajuste les paramètres en incluant le format d'image tuilé
6. Ferme le projet - retourne à l'écran principal

### Prévisualisation de carte

![Screenshot](http://tilemill.com/manual/map.png)

1. Prévisualisation de carte
2. Indicateur de zoom et contrôles
3. Étendre la page en plein écran

TileMill donne une prévisualisation interactive de la carte au fur et à mesure de sa conception. La carte est mise à jour chaque fois que vous enregistrez le projet.

Vous pouvez vous déplacer autour en cliquant, en déplaçant le contenu et zoomer/dézoomer en cliquant sur le boutons + et -. Le zoom peut également être géré avec la molette de la souris lorsque le curseur est sur ​​la carte, ou bien en maintenant la touche Maj enfoncée et en dessinant un cadre dans la zone où vous souhaitez effectuer le zoom. L'indicateur de niveau de zoom indique le niveau de zoom courant, ce qui est utile de savoir lors de la conception et la vérification des styles.

Le bouton pour passer en pleine page augmente la taille de l'aperçu, et il s'arrête lorsque vous êtes en mode grande-prévisualisation.

Lorsque vous enregistrez un projet, TileMill enregistre également la position et l'échelle que vous regardiez la carte. Si vous cartographiez seulement une petite région comme une ville, vous n'aurez pas à effectuer un zoom à chaque fois que vous rouvrez le projet.

### Liste des couches

![Screenshot](http://tilemill.com/manual/tools.png)

1. Bouton d'ajout de couche
2. Zone déplaçable
3. Icône indiquant la géométrie
4. IDs et classes (comme en css)
5. Inspecter la donnée de la couche
6. Éditer la couche
7. Supprimer la couche

Cliquer sur le bouton ’Ajouter une couche’ ouvre une boîte de dialogue où vous pouvez choisir un fichier shape, KML, GeoJSON ou GeoTIFF à ajouter au projet. Chaque couche doit avoir un seul ID (indiqué par le préfixe «#»), et peut de manière optionnelle avoir une ou plusieurs classes (indiquées par un "." préfixe). Elles sont définies lorsque la couche est ajoutée, mais peuvent être modifiées à tout moment en cliquant sur l'icône ’Modifier couche’.

Une couche peut être facilement réorganisée en cliquant dans la zone rayée et en la déplaçant au dessus ou au dessous d'une autre couche. Les zones de recouvrement entre couches seront rendus de manière à ce que la couche positionnée en haut de la liste superpose les couches inférieures.

Pour styler une couche, une couche peut être de quatre types de géométries - point, ligne, polygone, ou raster. Ceci est indiqué par l'icône de la géométrie. Certains types de styles ne s'appliquent qu'à certains types de couches : il est bon de savoir le type de géométrie de chacune.

### Inspecteur des données cartographiques

![Screenshot](http://tilemill.com/manual/inspector.png)

Si vous cliquez sur l'icône Loupe de n'importe quelle couche, un panneau de données va apparaître (Cela peut prendre quelques secondes pour afficher les données si vous inspectez un fichier complexe).

### Palette de couleurs

TileMill garde la trace de toutes les couleurs que vous avez utilisé dans un projet, permet facilement de les modifier et d'en ajouter des nouvelles.

### Liste des polices de caractères

En cliquant sur ​​l'onglet ’Fonts’ à côté de ’Colors’ va basculer l'affichage du panneau pour montrer une liste de toutes les polices système que Mapnik trouve. Vous pouvez filtrer la liste en complétant la zone de texte, ou faire défiler la liste pour trouver ce que vous recherchez. Cliquer sur ​​une police va insérer son nom (entre guillemets) dans le code où votre curseur se trouve.

Contrairement à ce que vous peut être utilisé dans des CSS ou des traitement de texte, il n'y a pas de propriétés distinctes pour une famille de police («Arial», par exemple), une graisse (par exemple, gras), ou un style (par exemple, italique). C'est pourquoi, par exemple, "Arial Bold ", "Arial Bold", et "Arial Italique" sont listées séparément.

### Editeur de code

![Screenshot](http://tilemill.com/manual/editor.png)

1. Active stylesheet tab
2. Delete stylesheet
3. Inactive stylesheet tabs
4. New stylesheet button
5. MSS syntax reference
6. Line numbers
7. Text area

TileMill provides an integrated code editor for editing the map stylesheets. This editor will make sure you write valid code, coloring correctly formatted text as you write it (syntax highlighting) and highlighting any errors if you try to save an invalid file.

As your map style becomes more complex, you may wish to keep things organized by splitting the style across multiple files. New stylesheets can be added with the + button on the tab bar and entering a name for the file. Though not required, there is a convention of using the file extention `.mss` for ‘map stylesheet’.

Stylesheets can be re-ordered by clicking and dragging their tabs within the tab bar. Note that just like CSS, the order can have an effect on the way a map is rendered - if two styles conflict, the one that is defined last will be applied. Here, ‘last’ means closest to the bottom of the file in the tab furthest to the right.

# Ajouter des couches

Layers are how sets of data are added to a map in TileMill. Each  layer references a single shapefile, geoJSON file, KML file, geoTIFF, or (soon) PostGIS database query. Multiple layers are combined over top of each other to create the final map - if you are familiar with layers in Photoshop or other graphics software the concept is very similar. TileMill currently supports creating maps with four data formats.

### Les fichiers shape ESRI

Usually referred to simply as ‘shapefile’, this is de facto standard file format for portable GIS data storage and is supported by most GIS software applications. The tricky part is that a single 'shapefile' is actually a collection of at least three files (possibly more). The required components are:

1. `file.shp` contains the geographical point, line, or polygon information
2. `file.dbf` a database of information describing objects in the .shp file
3. `file.shx` an index file

Because TileMill is designed to handle files across the Internet and dealing with collections of files complicates that somewhat, shapefiles must be stored in a zip file before they can be added to a TileMill project.

### GeoJSON

GeoJSON is a specification for storing spatial data in [JavaScript Object Notation](http://en.wikipedia.org/wiki/JSON), a compact plain-text format. The format can store points, lines, and polygons.

### KML

Keyhole Markup Language, or KML, is a standard geospatial data format that was originally developed for and popularized by Google Earth *1*. TileMill has limited support of this format - point and polygon styles will be ignored, and other features such as images and 3D models are not supported. There is also no support for the compressed KMZ format at this time.

- *1: Google acquired this project in 2004 from Keyhole, Inc., hence the name*

### GeoTIFF

GeoTIFF is a popular format for storing geospatial raster imagery such as satellite photography, remote sensing imagery, and digital elevation models.

Since Mapnik is currently unable to reproject raster data sources, to load them in TileMill you must ensure they are in Web Mercator projection. This can be done using the `gdalwarp` tool. For example, to reproject a Natural Earth world geotiff from its native WGS84, you would use a command such as

    gdalwarp -s_srs EPSG:4326 -t_srs "+proj=merc +a=6378137 +b=6378137 \
      +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null \
      +wktext +no_defs" -r cubic \
      -te -20037508.34 -20037508.34 20037508.34 20037508.34 \
      input_file.tif output_file.tif

<!-- TODO: explain the options -->

# Langage de styles

If you are familiar with web design with Cascading Stylesheets (CSS) the format of TileMill’s styling language will look familiar, though the exact properties are quite different.

## Symboles

Mapnik, the rendering software TileMill is built upon, provides a number of fundamental style types out of which to build complex styles. Each type is called a symbolizer, and has its own set of configurable properties.

There are currently 10 different symbolizers available in Mapnik, each of which can be applied to a certain type or types of geometry:

1. Line (for lines & polygons)
2. Polygon (for polygons*)
3. Point[c] (for points)
4. Text (for points, lines, and polygons)
5. Shield (for points & lines)
6. Line Pattern (for lines & polygons)
7. Polygon Pattern (for polygons*)
8. Raster (for rasters)
9. Markers (for points, lines, & polygons)
10. Buildings

*Note that these polygon symbolizers can technically be assigned to line geometries, but usually with unexpected or unsatisfactory results and is not really recommended.*

Multiple symbolizers can be applied to the same layer - some common combinations are line & polygons, point & text, line & markers, and line & line pattern.

A symbolizer is not present on the map unless it has a style defined, but once one of its style properties is added to the stylesheet default values will apply to the other properties for that symbolizer unless overridden. For example, the default line symbolizer color is black, so if you assign a `line-width` to a layer that line will be black unless you also assign a different color.

### The line symbolizer

Line styles can be applied to line or polygon geometries.

## Multiple symbolizers

A single layer is not limited to one of each symbolizer type. For example, multiple semi-transparent line symbolizers can be assigned to a polygon to achieve a soft glow or shadow effect. Multiple text symbolizers can be assigned to the same point with different offsets to label it with more than one field.

Normally when you assign a style to a layer, the style applies to a default symbolizer that is created. In the following example, the second rule overrides the first one because they both apply to the default symbolizer.

    #layer {
       line-color: #C00;
       line-width: 1;
    }

    #layer {
       line-color: #0AF;
       line-opacity: 0.5;
       line-width: 2;
    }

You can explicitly declare any number of new symbolizers for a layer that will be rendered in addition to styles they would otherwise conflict with. New symbolizers are defined using a double colon syntax inspired by [pseudo-elements](http://www.w3.org/TR/css3-selectors/#pseudo-elements) in CSS3:

    #layer {
       /* styles for the default symbolizers */
    }
    #layer::newsymbol {
       /* styles for a new symbolizer named ‘newsymbol’ */
    }

Note that `newsymbol` is not a special keyword but an arbitrary name chosen by the user. To help keep track of different symbolizers you can name additional symbolizers whatever makes sense for the situation. Some examples: `#road::casing`, `#coastline::glow_inner`, `#building::shadow`.

Returning to our previous example, declaring the second rule will add a blue glow on top of the red line instead of replacing it:

    #layer {
       line-color: #C00;
       line-width: 1;
    }

    #layer::glow {
       line-color: #0AF;
       line-opacity: 0.5;
       line-width: 4;
    }

![Screenshot](http://tilemill.com/manual/symbolizer-1.png)

Symbolizers are rendered in the order they are defined, so here the `::glow` (blue line) appears on top of the first style (red line).

Named symbolizer styles can still be overridden by further styles that reference the same symbolizer name. In this example, the line color will be green, not green-on-yellow.

    .border::highlight {
       line-color: #FF0;
       line-opacity: 0.5;
    }

    .border::highlight {
       line-color: #3F6;
    }

![Screenshot](http://tilemill.com/manual/symbolizer-2.png)

### Styles de ligne complexe avec plusieurs "symboliseurs"

En utilisant une combinaison de différents tiretés et/ou de motifs, une large variété de styles même très complexe peut être créée pour représenter les éléments linéaires.

*TODO: Exemples*

# Plus de ressources

## Sources de données SIG gratuites

### Globales

1. [Téléchargements des données OpenStreetMap par Cloudmade](http://downloads.cloudmade.com/)
2. [GADM Global Administrative Areas (Contours administratifs mondiaux)](http://gadm.org/)
3. [Natural Earth](http://www.naturalearthdata.com/) (une grande partie est incluse dans TileMill)
4. [Données d'élevation SRTM du CGIAR](http://srtm.csi.cgiar.org/)

### Nationales
1. [Données TIGER du bureau du Recensement US/Shapefiles linéaires](http://www.census.gov/geo/www/tiger/tgrshp2009/tgrshp2009.html)
2. [GeoGratis - Ressources Naturelles du Canada](http://www.geogratis.cgdi.gc.ca/)

### Régionales & locales

1. [Catalogue SIG du district de Columbia](http://dcatlas.dcgis.dc.gov/catalog/)
2. [Données ouvertes de Ottawa](http://www.ottawa.ca/online_services/opendata/index_en.html)
3. [Données ouvertes de la ville de Paris (français)](http://opendata.paris.fr/opendata/jsp/site/Portal.jsp)



- [Introduction](#introduction)
- [Basics](#basics)
  - [GIS](#gis)
  - [Map projections](#map-projections)
  - [Zoom levels](#zoom-levels)
- [Interface tour](#interface-tour)
  - [Main toolbar](#main-toolbar)
  - [Map preview](#map-preview)
  - [Layers list](#layers-list)
  - [Layer data inspector](#layer-data-inspector)
  - [Color palette](#color-palette)
  - [Fonts list](#fonts-list)
  - [Code editor](#code-editor)
- [Adding layers](#adding-layers)
  - [ESRI Shapefile](#esri-shapefile)
  - [GeoJSON](#geojson)
  - [KML](#kml)
  - [GeoTIFF](#geotiff)
- [The styling language](#the-styling-language)
  - [Symbolizers](#symbolizers)
  - [The line symbolizer](#the-line-symbolizers)
  - [Complex line styles with multiple symbolizers](#complex-line-styles-with-multiple-symbolizers)
- [Further resources](#further-resources)
  - [Free sources of GIS data](#free-sources-of-gis-data)
  - [Global](#global)
  - [National](#national)
  - [Regional & Local](#regional-local)

