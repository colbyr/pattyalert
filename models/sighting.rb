require 'mongo'
require 'json'

db = Mongo::Connection.new.db("pattyalert")
@@coll = db.collection("sightings")

class Sighting
  def initialize attributes
    @attributes = attributes
  end

  def day
    @attributes["day"]
  end

  def date
    @attributes["date"]
  end

  def meal
    @attributes["meal"]
  end

  def save
    @@coll.insert(@attributes)
  end
end

