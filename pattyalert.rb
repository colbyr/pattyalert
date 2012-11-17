require 'sinatra'
require './models/enthusiast.rb'

get '/' do
  erb :index
end
