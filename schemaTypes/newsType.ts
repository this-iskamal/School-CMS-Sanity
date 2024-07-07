import { defineField, defineType } from 'sanity';

export const newsType = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [

    defineField({
      name: 'title',
      title: 'News Title',
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
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          
        },
  
        {
          type: 'image',
          options: {
            hotspot: false,
          },
          
        },
      ],
      validation: Rule => Rule.required().error('Content is required.')
    }),


    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      validation: Rule => Rule.required().error('Publication date is required.')
    }),


    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teacher' }],
      options: {
        disableNew: true 
      },
      validation: Rule => Rule.error('Please select a valid author.')
    }),


    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
        validation: Rule => Rule.required().error('Main image is required.')
    })
  ],


  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: new Date(subtitle).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        media,
      };
    },
  },
});
