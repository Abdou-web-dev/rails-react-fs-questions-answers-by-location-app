# Calculate the distance between two points on the Earth's surface

# using the Haversine formula

def haversine_distance(lat1, lon1, lat2, lon2)

# Radius of the Earth in kilometers

radius = 6371.0

# Convert latitude and longitude from degrees to radians

lat1*rad = Math::PI * lat1 / 180.0
lon1*rad = Math::PI * lon1 / 180.0
lat2*rad = Math::PI * lat2 / 180.0
lon2*rad = Math::PI * lon2 / 180.0

# Differences in coordinates

dlat = lat2_rad - lat1_rad
dlon = lon2_rad - lon1_rad

# Haversine formula

a = Math.sin(dlat / 2.0)**2 + Math.cos(lat1*rad) * Math.cos(lat2*rad) * Math.sin(dlon / 2.0)**2
c = 2 \* Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

# Distance in kilometers

distance = radius \* c

return distance
end

# Coordinates of two points

lat1 = 37.7749
lon1 = -122.4194
lat2 = 34.0522
lon2 = -118.2437

# Calculate distance

distance = haversine_distance(lat1, lon1, lat2, lon2)

puts "Distance between the two points: #{distance.round(2)} kilometers"

# Coordinates of two points

lat1 = 37.7749
lon1 = -122.4194
lat2 = 34.0522
lon2 = -118.2437

# Calculate distance

distance = haversine_distance(lat1, lon1, lat2, lon2)

puts "Distance between the two points: #{distance.round(2)} kilometers"

---

In a Rails application, you might use this logic to calculate the distance between the user's location and the location of questions. Keep in mind that this is a simplified example, and for a production application, you may want to consider using a dedicated gem for geospatial calculations, like the geocoder gem, which integrates well with Rails.
