const knex = require("../database/knex");

class NotesController {
    async create (request, response){
        const { title, description, tags, links } = request.body;
        const user_id = request.user.id

        const note_id = await knex("notes").insert({
            title, 
            description,
            user_id
        })

        const linksInsert = links.map(link => {
            return {
                note_id,
                url: link
            }
        })

        await knex("links").insert(linksInsert);

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        })

        await knex("tags").insert(tagsInsert);

        return response.json();

    }

    async show (request, response){
        const { id } = request.params; // Neste caso é o ID da nota

        const note = await knex("notes").where({ id }).first();
        const tags = await knex("tags").where({ note_id: id }).orderBy("name");
        const links = await knex("links").where({ note_id: id }).orderBy("created_at");

        return response.json({
            ...note,
            tags,
            links
        });
    }

    async delete (request, response){
        const { id } = request.params;

        await knex("notes").where({ id }).delete();

        return response.json();
    }

    async index (request, response){ // função que vai listar o que for pedido. 
        const { title, tags } = request.query;
        const user_id = request.user.id

        let notes;

        if(tags){
            const FilterTags = tags.split(',').map( tag => tag.trim()); // irá devolver um array
            
            notes = await knex("tags") // select - para selecionar o que eu preciso das duas tabelas. 
            .select([
                "notes.id",
                "notes.title",
                "notes.user_id"
            ])
            .where("notes.user_id", user_id) // buscar pelas tags do ID do usuário
            .whereLike("notes.title", `%${title}%`)
            .whereIn("name", FilterTags)
            .innerJoin("notes", "notes.id", "tags.note_id") //pram1 = tabela que eu quero conectar, param2 = quais campos vou usar para conectar
            .orderBy("title")           
        }
        else{
            notes = await knex("notes")
            .where({ user_id })
            .whereLike("title", `%${title}%`) // O % pesquisar tanto antes quanto depois
            .orderBy("title")
        }

        const userTags = await knex("tags").where({ user_id }); // aqui está todas as tags criada por determinado usuário
        const notesWithTags = notes.map( note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id)

            return {
                ...note,
                tags: noteTags
            }
        } )

        
      
        return response.json(notesWithTags);
    }
};

module.exports = NotesController;
