class TaglistSerializer
  include FastJsonapi::ObjectSerializer
  attributes :tag, :slug
end
