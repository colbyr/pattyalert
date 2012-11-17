require 'sinatra'
require 'mongo'

db = Mongo::Connection.new.db("patty")

get '/' do
  @level = params[:level]
  puts @level
  erb(:index)
end
