module Api
    module V1
        class WordslistsController < ApplicationController
            def index
                wordslist = Wordslist.all
                render json: WordslistSerializer.new(wordslist).serialized_json
            end

            def show
                wordslist = Wordslist.find(params[:id])
                render json: WordslistSerializer.new(wordslist).serialized_json
            end

            def create
                wordslist = Wordslist.new(wordslist_params)
                if wordslist.save
                    render json: WordslistSerializer.new(wordslist).serialized_json
                else
                    render json: { error: wordslist.errors.messages }, status: 422
                end
            end

            def update
                wordslist = Wordslist.find(params[:id])
                wordslist.update(wordslist_params)
                render json: WordslistSerializer.new(wordslist).serialized_json
            end

            def destroy
                wordslist = Wordslist.find(params[:id])
                if wordslist.destroy
                    head :no_content
                else
                    render json: { error: wordslist.errors.messages }, status: 422
                end
            end

            private

            def wordslist_params
                params.require(:wordslist).permit(:name, :tag)
            end
        end
    end
end