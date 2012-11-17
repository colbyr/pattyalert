require 'sinatra'
require 'mongo'

db = Mongo::Connection.new.db("patty")

get '/' do
  erb :index
end
