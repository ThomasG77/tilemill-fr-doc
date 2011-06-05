# Introduction

TileMill est un outil pour les cartographes permettant de concevoir rapidement et facilement des cartes pour le Web en utilisant des données personnalisées. Il est construit sur la base de la puissante librairie de rendu cartographique open-source [Mapnik](http://www.mapnik.org) - la même que celle qu'[OpenStreetMap](http://www.openstreetmap.org/) et [MapQuest]( http://www.mapquest.com) utilisent pour faire certaines de leurs cartes. TileMill n'est pas destiné à être un outil de cartographie généraliste, il se concentre plutôt sur la rationalisation et la simplification d'un certain nombre de cas d'utilisation.

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

Cliquer sur le bouton ’Ajouter une couche’ ouvre une boîte de dialogue où vous pouvez choisir un fichier shape, KML, GeoJSON ou GeoTIFF à ajouter au projet. Chaque couche doit avoir un seul ID (indiqué par le préfixe «#»), et peut de manière optionnelle avoir une ou plusieurs classes (indiquées par un préfixe "."). Elles sont définies lorsque la couche est ajoutée, mais peuvent être modifiées à tout moment en cliquant sur l'icône ’Modifier couche’.

Une couche peut être facilement réorganisée en cliquant dans la zone rayée et en la déplaçant au dessus ou au dessous d'une autre couche. Les zones de recouvrement entre couches seront rendues de manière à ce que la couche positionnée en haut de la liste soit par dessus les couches inférieures.

Pour styler une couche, une couche peut être de quatre types de géométries - point, ligne, polygone, ou raster. Ceci est indiqué par l'icône de la géométrie. Certains types de styles ne s'appliquent qu'à certains types de couches : il est bon de savoir le type de géométrie de chacune.

### Inspecteur des couches cartographiques

![Screenshot](http://tilemill.com/manual/inspector.png)

Si vous cliquez sur l'icône Loupe de n'importe quelle couche, un panneau de données va apparaître (Cela peut prendre quelques secondes pour afficher les données si vous inspectez un fichier complexe).

### Palette de couleurs

TileMill garde la trace de toutes les couleurs que vous avez utilisé dans un projet, permet facilement de les modifier et d'en ajouter des nouvelles.

### Liste des polices de caractères

En cliquant sur ​​l'onglet ’Fonts’ à côté de ’Colors’ l'affichage du panneau va basculer pour montrer une liste de toutes les polices système que Mapnik trouve. Vous pouvez filtrer la liste en complétant la zone de texte, ou faire défiler la liste pour trouver ce que vous recherchez. Cliquer sur ​​une police va insérer son nom (entre guillemets) dans le code où votre curseur se trouve.

Contrairement à ce que vous peut être utilisé dans des CSS ou des traitement de texte, il n'y a pas de propriétés distinctes pour une famille de police («Arial», par exemple), une graisse (par exemple, gras), ou un style (par exemple, italique). C'est pourquoi, par exemple, "Arial Bold ", "Arial Bold", et "Arial Italique" sont listées séparément.

### Editeur de code

![Screenshot](http://tilemill.com/manual/editor.png)

1. Onglet de la feuille de style active
2. Supprimer la feuille de style
3. Onglets avec feuilles de style inactives
4. Bouton de création de nouvelle feuille de style
5. Référence pour la syntaxe MSS
6. Numéros de ligne
7. Zone de texte

TileMill fournit un éditeur de code intégré pour modifier les feuilles de style de la carte. L'éditeur vérifie que vous écrivez du code valide, colorie le texte correctement formaté de manière dynamique (coloration syntaxique) et indique les erreurs lorsque vous essayez d'enregistrer un fichier non valide.

Au fur et à mesure que les styles de votre carte deviennent complexes, vous pouvez séparer les styles pour les répartir dans plusieurs fichiers. De nouvelles feuilles de style peuvent être ajoutées avec le bouton + de la barre d'onglets et en entrant un nom pour le fichier. Même si ce n'est pas une obligation, la convention est de nommer l'extension de ce fichier ‘. mss‘ pour les ‘feuille de style’ de la carte.

Les feuilles de style peuvent être réorganisées en cliquant et déplaçant leurs onglets au sein de la barre d'onglets. Notez que, comme avec les CSS, l'ordre peut avoir un effet sur la manière dont une carte est générée. Si deux styles rentrent en conflit, c''est celui qui est défini en dernier qui sera utilisé. Ici, ‘le dernier‘ signifie le style dans la feuille de style le plus à droite et le plus bas dans le fichier.

# Ajouter des couches

Les couches indiquent la façon dont l'ensemble de données est ajouté à une carte dans TileMill. Chaque couche fait référence à une seule source de données : shapefile, GeoJSON, KML, GeoTIFF et base de données PostGIS. C'est la superposition des différentes couches qui permet d'obtenir la carte finale. Si vous êtes familier avec les calques dans Photoshop ou autres logiciels de graphisme, le concept est assez similaire. TileMill pour le moment permet de créer des cartes avec quatre format de données.

### Les fichiers shape ESRI

Qualifié aussi avec le nom ‘shapefile’, c'est le format standard de fait pour échanger les données SIG et il est supporté par la plupart des logiciels SIG. La chose trompeuse est que ce qu'on qualifie de fichier 'shapefile' est en fait un collection constituée au minimum de trois fichiers (et parfois plus). Les fichiers nécessaires sont:

1. `fichier.shp` qui contient l'information géographique ponctuelle, linéaire ou surfacique
2. `fichier.dbf` qui est un fichier de données tabulaires décrivant les objets dans le fichier .shp
3. `fichier.shx` qui est un fichier d'index

Parce que TileMill est conçu pour gérer les fichiers par Internet et gérer beaucoup de fichiers compliqués, les shapefiles doivent être compressés dans un fichier zip avant d'être ajouté dans un projet TileMill.

### GeoJSON

GeoJSON est une spécification pour stocker les données spatiales en [JavaScript Object Notation](http://en.wikipedia.org/wiki/JSON), un format de fichier texte très léger. Ce format permet de stocker des points, des lignes, et des polygones.

### KML

KML est un format standard de données géospatiales qui a été initialement développé et popularisé par Google Earth *1*. TileMill a un support limité de ce format - les styles des points et des polygones seront ignorés, et d'autres fonctionnalités comme les images et les modèles 3D ne sont pas pris en charge. Il n'y a pas de support aussi pour le format compressé KMZ pour le moment.

- *1: Google a acquis ce projet en 2004 de la société Keyhole, Inc., d'où le nom*

### GeoTIFF

GeoTIFF est un format les plus utilisé pour stocker des images raster géospatiales comme des photographies satellite, des images de télédétection, et des modèles de données d’élévation.

Comme Mapnik est pour le moment incapable de reprojecter des sources de données raster, pour les charger dans TileMill, vous devez vous assurez qu'elles sont dans la projection Web Mercator. Cela peut être réalisé en utilisant l'outil `gdalwarp`. Par exemple, pour reprojeter un geotiff issu de Natural Earth depuis sa projection native en  WGS84, vous devriez utiliser une commande de ce type

    gdalwarp -s_srs EPSG:4326 -t_srs "+proj=merc +a=6378137 +b=6378137 \
      +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null \
      +wktext +no_defs" -r cubic \
      -te -20037508.34 -20037508.34 20037508.34 20037508.34 \
      input_file.tif output_file.tif

<!-- TODO: Expliquer les options -->

### PostGIS

[PostGIS](http://postgis.refractions.net/) est une extension pour PostgreSQL qui permet de stocker des objets géographiques dans une base de données. Elle fournit des fonctions spéciales et des index pour interroger et manipuler des données spatiales et peut être utilisée comme un outil puissant de stockage/d'analyse. Depuis TileMill, vous pouvez vous connecter à une base de données PostGIS et lancer des requêtes directement depuis l'application. Regardez l'onglet PostGIS dans le panneau "Add layer".

# Langage de styles

Si vous êtes familier du webdesign avec les CSS (Cascading Stylesheets), le format du langage de style de TileMill va vous sembler familier, bien que les propriétés exactes soient quelques peu différentes.

## Symbologies

Mapnik, le logiciel de rendu sur lequel s'appuie TileMill fournit un certain nombre de types de styles fondamentaux pour construire des styles complexes. Chaque type est appelé une symbologie, et a son propre ensemble de propriétés configurables.

Il ya actuellement 10 symbologies différentes disponibles dans Mapnik, dont chacune peut être appliquée à un ou plusieurs types de géométrie:

1. "Line" (pour les lignes & les polygones)
2. "Polygon" (pour les polygones*)
3. "Point[c]" (pour les points)
4. "Text" (pour les points, les lignes, & les polygones)
5. "Shield" (pour les points & les lignes)
6. "Line Pattern" (pour les lignes & les polygones)
7. "Polygon Pattern" (pour les polygones*)
8. "Raster" (pour les rasters)
9. "Markers" (pour les points, les lignes, & les polygones)
10. "Buildings"

*Notez que ces symbologies de polygones peuvent techniquement associées à des géométries linéaires, mais généralement on obtient des résultats innatendus ou insatisfaisants et ce n'est pas vraiment recommandé.*

De multiples symbologies peuvent être appliquées à la même couche - les combinaisons les plus communes sont "line" & "polygons", "points" & "text", "line & "markers", et "line" et "line pattern".

Une symbologie n'est pas présente sur la carte, tant qu'elle n'a pas un style défini, mais une fois que des propriétés de style sont ajoutées à la feuille de style par défaut, elles seront appliquées à toutes les symbologies de même type sauf si on surcharge les propriétés. Par exemple, la couleur de symbologie "line" par défaut est noir, si vous affectez une ’line-width’ sur une couche, alors cette ligne sera noir sauf si vous lui assignez une couleur différente.

### Les symbologies "line"

Ce style de ligne peut s'appliquer à des lignes ou à des polygones.

## Symbologies multiples

Une couche seule n'est pas limité à une symbologie de chaque type. Par exemple, plusieurs symbologies semi-transparentes de type "line" peuvent être attribuées à un polygone pour obtenir un effet de lueur ou d'ombre. De multiples symbologies "text" peuvent être attribuées au même point avec des positions différentes afin d'utiliser des étiquettes pour plusieurs champs.

Normalement, lorsque vous assigner un style à une couche, le style s'applique à une symbologie par défaut qui est créée. Dans l'exemple suivant, la deuxième règle l'emporte sur la première parce qu'elles s'appliquent toutes les deux à la symbologie par défaut.

    #layer {
       line-color: #C00;
       line-width: 1;
    }

    #layer {
       line-color: #0AF;
       line-opacity: 0.5;
       line-width: 2;
    }

Vous pouvez déclarer explicitement n'importe quelle nombre de nouvelles symbologies pour une couche qui sera générée en plus des styles avec lesquels elle serait rentré en conflit. Les nouvelles symbologies sont définies en utilisant une syntaxe utilisant deux "deux points" inspirée par les [pseudo-éléments](http://www.w3.org/TR/css3-selectors/ pseudo-éléments #) dans CSS3:

    #layer {
       /* styles for the default symbolizers */
    }
    #layer::newsymbol {
       /* styles for a new symbolizer named ‘newsymbol’ */
    }

Notez que `newsymbol` n'est pas un mot clé, mais un nom arbitraire choisi par l'utilisateur. Pour vous aider à garder la trace des différents symbologies, vous pouvez nommer les symbologies supplémentaires qui ont un sens adapté à la situation. Quelques exemples: `#road::casing`, `#coastline::glow_inner`, `#building::shadow`.

En revenant à notre exemple précédent, déclarer la seconde règle va ajouter une effet de lueur bleue par dessus la ligne rouge au lieu de la remplacer:

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

Le rendu des symbologies se fait dans l'ordre dans lequel elles ont été définies, donc ici le `::glow` (ligne bleue) apparaît au dessus du premier style (ligne rouge).

Les styles de symbologies nommés peuvent être remplacés par d'autres styles faisant référence au même nom de symbologie. Dans cet exemple, la couleur de ligne sera verte, et non verte sur jaune.

    .border::highlight {
       line-color: #FF0;
       line-opacity: 0.5;
    }

    .border::highlight {
       line-color: #3F6;
    }

![Screenshot](http://tilemill.com/manual/symbolizer-2.png)

### Styles de ligne complexe avec plusieurs symbologies

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
- [Éléments de base](#elements-de-base)
  - [Les SIG](#les-sig)
  - [Projections cartographiques](#projections-cartographiques)
  - [Niveaux de zoom](#niveaux-de-zoom)
- [Vue rapide de l'interface utilisateur](#vue-rapide-de-l-interface-utilisateur)
  - [Barre d'outils principale](#barre-d-outils-principale)
  - [Prévisualisation de carte](#previsualisation-de-carte)
  - [Liste des couches](#liste-des-couches)
  - [Inspecteur des couches cartographiques](#inspecteur-des-couches-cartographiques)
  - [Palette de couleurs](#palette-de-couleurs)
  - [Liste des polices de caractères](#liste-des-polices-de-caracteres)
  - [Editeur de code](#editeur-de-code)
- [Ajouter des couches](#ajouter-des-couches)
  - [Les fichiers shape ESRI](#les-fichiers-shape-esri)
  - [GeoJSON](#geojson)
  - [KML](#kml)
  - [GeoTIFF](#geotiff)
  - [PostGIS](#postgis)
- [Langage de styles](#langage-de-styles)
  - [Symbologies](#symbologies)
  - [Les symbologies "line"](#les-symbologies-line-)
  - [Symbologies multiples](#symbologies-multiples)
  - [Styles de ligne complexe avec plusieurs symbologies](#styles-de-ligne-complexe-avec-plusieurs-symbologies)
- [Plus de ressources](#plus-de-ressources)
  - [Sources de données SIG gratuites](#sources-de-donnees-sig-gratuites)
  - [Globales](#globales)
  - [Nationales](#nationales)
  - [Régionales & locales](#regionales-locales)

