class WordslistSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :tag, :slug
end
