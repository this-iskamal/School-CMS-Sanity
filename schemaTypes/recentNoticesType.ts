import { defineField, defineType } from 'sanity';

export const recentNoticesType = defineType({
  name: 'recentNotice',
  title: 'Recent Notice',
  type: 'document',
  fields: [

    defineField({
      name: 'title',
      title: 'Notice Title',
      type: 'string',
      validation: Rule => Rule.required().min(5).error('Title is required and should be at least 5 characters long.')
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-') 
          .slice(0, 96) 
      },
      validation: Rule => Rule.required().error('Slug is required.')
    }),
   
    defineField({
        name: 'notices',
        title: 'Recent Notices',
        type: 'array',
        of: [{ type: 'block' }],
        validation: Rule => Rule.required().error('Notice is required.')
      }),

    defineField({
        name: 'photos',
        title: 'Recent Notices',
        type: 'array',
        of: [
          {
            type: 'image',
            
          }
        ],
        options: {
          layout: 'grid',
        },
        validation: Rule => Rule.required().min(1).error('At least one notice must be added.')
      }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
     
    },
    prepare(selection) {
      const { title, subtitle} = selection;
      return {
        title,
        subtitle: `Slug: ${subtitle}`, 
      
      };
    },
  },
});
