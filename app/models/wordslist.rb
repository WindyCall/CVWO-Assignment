class Wordslist < ApplicationRecord

    before_create :slugify
    def slugify
        self.slug = name + tag
    end
end
