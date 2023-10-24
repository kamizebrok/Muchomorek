import random
from geopy.geocoders import Nominatim
import geopandas as gpd
from shapely.geometry import Point


def generate_points_in_poland(num_points):
    points = []
    for _ in range(num_points):
        latitude = round(random.uniform(49.0, 54.0), 4)
        longitude = round(random.uniform(14.0, 24.0), 4)
        value = random.randint(38, 167)
        mushroom_type = random.choice(['Borowik', 'Kurka', 'Prawdziwek'])
        points.append([latitude, longitude, value, mushroom_type])
    return points


def is_point_in_poland(latitude, longitude):
    geolocator = Nominatim(user_agent="point-in-poland-checker")
    location = geolocator.reverse(f"{latitude}, {longitude}", language="en", exactly_one=True)

    if location and 'address' in location.raw and 'country' in location.raw['address']:
        country = location.raw['address']['country']
        return country == 'Poland'
    else:
        return False


wojewodztwa = gpd.read_file('C:\\Users\\Marcin\\Desktop\\Muchomorek\\wojewodztwa-medium.geojson')


points_in_poland = generate_points_in_poland(300)

for point in points_in_poland:
    latitude, longitude, _, _ = point
    points = Point(longitude, latitude)
    if is_point_in_poland(latitude, longitude):
        for index, row in wojewodztwa.iterrows():
            if row['geometry'].contains(points):
                point.append(row['nazwa'])
                print(f"{point},")
                break
            else:
                continue

