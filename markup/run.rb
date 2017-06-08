require 'sinatra'
require 'github/markup'

def render_markup(content)
  return GitHub::Markup.render_s(GitHub::Markups::MARKUP_MARKDOWN, content)
end

post '/markup' do
  request.body.rewind
  body render_markup(request.body.read)
end