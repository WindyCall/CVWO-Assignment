# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#

wordslists = Wordslist.create([
    {name: "hello", tag: ""},
    {name: "apple", tag: "fruit"},
    {name: "pear", tag: "fruit"},
    {name: "hair", tag: ""},
    {name: "swimming", tag: "sport"}
    
])

taglists = Taglist.create([
    {tag: "fruit"},
    {tag: "sport"},
    {tag: "food"},
    {tag: "item"},
    {tag: "drink"}

])