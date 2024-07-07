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
      name: 'content',
      title: 'Notice Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike-through', value: 'strike-through' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: Rule => Rule.required().error('Content is required.')
    }),

    defineField({
      name: 'photos',
      title: 'Notice Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: Rule => Rule.max(10).error('You can upload up to 10 photos.')
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current', 
      media: 'photos.0' 
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: `Slug: ${subtitle}`, 
        media,
      };
    },
  },
});
