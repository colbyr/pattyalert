require 'mongo'
require 'json'
require 'twilio-ruby'

db = Mongo::Connection.new.db("pattyalert")
@@coll = db.collection("enthusiasts")

class Enthusiast
  def initialize attributes
    @attributes = attributes
  end

  def number
    @attributes["number"]
  end

  def attributes
    @attributes
  end

  def save
    @@coll.insert(@attributes)
  end
end
