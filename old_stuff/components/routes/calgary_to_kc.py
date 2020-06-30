import gmaps2geojson
# import os
# import googlemaps

# apikey = os.environ['GMAPS_KEY']

# gmaps = googlemaps.Client(key=apikey)
writer = gmaps2geojson.Writer()

path1 = writer.query("804 18 Avenue Southwest, Calgary, AB", "Carway, AB T0K1Y0")
path2 = writer.query("Carway, Alberta T0K 1Y0, Canada", "Red Rock Point, Montana 59936")
path3 = writer.query("Red Rock Point, Montana 59936, USA", "Missoula, MT 59802, USA")
path4 = writer.query("Missoula, MT 59802, USA", "Bozeman, Montana 59715, USA")
path5 = writer.query("Bozeman, Montana 59715, USA", "Gardiner, Montana 59030, USA")
path6 = writer.query("Gardiner, Montana 59030, USA", "Old Faithful, Yellowstone National Park, WY 82190, USA")
path7 = writer.query("Old Faithful, Yellowstone National Park, WY 82190, USA", "Elk, Wyoming 83012, USA")
path8 = writer.query("Elk, Wyoming 83012, USA", "Jackson, WY 83001, USA")
path9 = writer.query("Jackson, WY 83001, USA", "Echo, UT 84024, USA")
path10 = writer.query("Echo, UT 84024, USA", "Moab, Utah 84532, USA")
path11 = writer.query("Moab, Utah 84532, USA", "Arches National Park Visitor Center, Moab, UT 84532, USA")
path12 = writer.query("Arches National Park Visitor Center, Moab, UT 84532, USA", "Island in the Sky Visitor Center, Grand View Point Rd, Moab, UT 84532, USA")
path13 = writer.query("Island in the Sky Visitor Center, Grand View Point Rd, Moab, UT 84532, USA", "Grand Junction, CO 81501, USA")
path14 = writer.query("Grand Junction, CO 81501, USA", "Glenwood Springs, CO 81601, USA")
path15 = writer.query("Glenwood Springs, CO 81601, USA", "Hays, Kansas 67601, USA")
path16 = writer.query("Hays, Kansas 67601, USA", "1411 NE 79th St, Kansas City, MO 64118, USA")

writer.save("calgary_to_kc.geojson")