require "bundler/inline"

gemfile do
    source "http://rubygems.org"

    gem "sinatra-contrib"

    gem "rackup"
    gem "puma"
    gem "rest-client"
end

require "sinatra/base"
require "sinatra/reloader"

class MySinatraApp < Sinatra::Base
    set :public_folder, File.expand_path("public", __dir__)
    set :static, true
    set :bind, '0.0.0.0'

    configure :development do
        register Sinatra::Reloader
    end

    get "/api/googlebooks" do
      query = params["query"]
      key = params["key"]

      response = RestClient.get(
        "https://www.googleapis.com/books/v1/volumes", {
          params: {
            "q"=> query,
            "maxResults" => 10,
            "key" => key,
            "fields" => "items(id,volumeInfo(title,authors,industryIdentifiers,imageLinks,pageCount,publishedDate,publisher,previewLink,infoLink))"
          }
      })

    end 

    get "/api/openlibrary" do
      query = params["query"]

      response = RestClient.get(
        "https://openlibrary.org/search.json", {
          params: {
            "q"=> query,
            "limit" => 10,
            "fields" => "title,author_name,isbn,cover_i,number_of_pages_median,first_publish_year,publisher,key,edition_key,first_sentence"
          }
      })

    end

    get "*" do
      send_file File.join(settings.public_folder, "index.html")
    end

    run! if app_file == $0
end
