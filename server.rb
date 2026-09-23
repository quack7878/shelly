require "bundler/inline"

gemfile do
    source "http://rubygems.org"

    gem "sinatra-contrib"

    gem "rackup"
    gem "puma"
    gem "faraday"
end

require "sinatra/base"
require "sinatra/reloader"
require "faraday"

class MySinatraApp < Sinatra::Base
    set :public_folder, File.expand_path("public", __dir__)
    set :static, true
    set :bind, '0.0.0.0'

    configure :development do
        register Sinatra::Reloader
        set :host_authorization, {
          permitted_hosts: [
            "shelly.acourcy.ca",
            "acourcy.ca",
            "localhost",
            "127.0.0.1"
          ]
        }
    end

    get "/api/googlebooks" do
      query = params["q"]
      key = params["key"]

      response = Faraday.get("https://www.googleapis.com/books/v1/volumes") do |request|
        request.params["q"] = query
        request.params["key"] = key
        request.params["maxResults"] = 2
        request.params["fields"] = "items(id,volumeInfo(title,authors,industryIdentifiers,imageLinks,pageCount,publishedDate,publisher,previewLink,infoLink))"
      end

      response.body

    end 

    get "/api/openlibrary" do
      query = params["q"]

      response = Faraday.get("https://openlibrary.org/search.json") do |request|
        request.params["q"] = query
        request.params["limit"] = 2
        request.params["fields"] = "title,author_name,isbn,cover_i,number_of_pages_median,first_publish_year,publisher,key,edition_key,first_sentence"
      end

      response.body

    end

    get "*" do
      send_file File.join(settings.public_folder, "index.html")
    end

    run! if app_file == $0
end
