module Api
    module V1
        class TaglistsController < ApplicationController
            def index
                taglist = Taglist.all
                render json: TaglistSerializer.new(taglist).serialized_json
            end

            def create
                taglist = Taglist.new(taglist_params)
                if taglist.save
                    render json: TaglistSerializer.new(taglist).serialized_json
                else
                    render json: { error: wordslist.errors.messages }, status: 422
                end
            end

            def destroy
                taglist = Taglist.find_by(tag: params[:tag])
                if taglist.destroy
                    head :no_content
                else
                    render json: { error: wordslist.errors.messages }, status: 422
                end
            end
            
            private

            def taglist_params
                params.require(:taglist).permit(:tag)
            end
        end
    end
end