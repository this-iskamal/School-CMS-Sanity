import { defineField, defineType } from 'sanity';

export const programType = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [

    defineField({
      name: 'name',
      title: 'Program Name',
      type: 'string',
      validation: Rule => Rule.required().min(5).error('Program name is required and should be at least 5 characters long.')
    }),


    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 96) 
      },
      validation: Rule => Rule.required().error('Slug is required.')
    }),


    defineField({
      name: 'description',
      title: 'Program Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required().error('Description is required.')
    }),


    defineField({
      name: 'image',
      title: 'Program Image or Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
        validation: Rule => Rule.required().error('Image is required.')
    })
  ],


  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'image'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: `Slug: ${subtitle}`,
        media
      };
    },
  },
});
