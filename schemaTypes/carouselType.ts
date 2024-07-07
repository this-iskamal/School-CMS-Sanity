import { defineField, defineType } from 'sanity';

export const carouselType = defineType({
  name: 'carousel',
  title: 'Carousel Items',
  type: 'document',
  fields: [

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title for the carousel item',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional description for the carousel item',
    }),
 
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
     
    }),

    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Optional link for the carousel item',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
});
