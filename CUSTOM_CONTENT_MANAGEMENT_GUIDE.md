# Custom Content Management System

This system allows you to customize the content that appears on your tag pages through the admin panel. Instead of showing auto-generated content, you can now write your own custom content for specific tags.

## Features

- **Admin Panel Interface**: Easy-to-use interface to manage custom content
- **Rich Text Support**: Write detailed content with line breaks and formatting
- **Fallback System**: Auto-generated content still shows if no custom content exists
- **Page Type Support**: Currently supports tags, with future support for pornstars and categories
- **Status Management**: Enable/disable custom content without deleting it

## How It Works

### 1. Default Behavior (No Custom Content)
When you visit a tag page like `/tag/blowjob`, the system automatically generates content based on:
- Video statistics (total count, views)
- Performer names from videos
- Related tags
- Video titles and keywords

### 2. Custom Content Override
When you create custom content for a tag through the admin panel:
- Your custom content replaces the auto-generated content
- The custom title and content are displayed instead
- Auto-generated content is completely hidden

## Admin Panel Usage

### Accessing Custom Content Management
1. Login to admin panel: `http://localhost:3000/admin`
2. Navigate to **Custom Content** in the navigation menu
3. You'll see a list of all custom content entries

### Creating New Custom Content
1. Click **"Add Content"** button
2. Fill in the form:
   - **Page Type**: Select "Tag" (more types coming soon)
   - **Slug**: Enter the tag name (e.g., "blowjob", "milf", "anal")
   - **Title**: Enter the heading (e.g., "About Blowjob Sex Videos")
   - **Content**: Write your custom content with line breaks
3. Click **"Create"** to save

### Editing Existing Content
1. Click the **Edit** icon (pencil) next to any content entry
2. Modify the title and/or content
3. Click **"Update"** to save changes

### Managing Content Status
- **Eye Icon**: Click to deactivate content (hides it from website)
- **Eye-Off Icon**: Click to reactivate content
- **Trash Icon**: Permanently delete content

### Search and Filter
- Use the search box to find content by title or slug
- Use the dropdown to filter by page type (Tag, Pornstar, Category)

## Technical Implementation

### Database Schema
```javascript
{
  pageType: 'tag',           // Type of page (tag/pornstar/category)
  slug: 'blowjob',          // URL slug (tag name)
  title: 'About Blowjob...',// Display title
  content: 'Your content...', // Main content text
  isActive: true,           // Whether to show this content
  createdBy: 'admin991',    // Who created it
  createdAt: Date,          // Creation timestamp
  updatedAt: Date           // Last update timestamp
}
```

### API Endpoints
- `GET /api/custom-content` - List all content (admin)
- `GET /api/custom-content/tag/blowjob` - Get content for specific tag
- `POST /api/custom-content` - Create new content
- `PUT /api/custom-content/:id` - Update content
- `DELETE /api/custom-content/:id` - Delete content
- `PATCH /api/custom-content/:id/toggle` - Toggle active status

### Frontend Integration
The tag page (`/app/tag/[tag]/page.js`) now:
1. First tries to fetch custom content from the database
2. If custom content exists and is active, displays it
3. If no custom content, falls back to auto-generated content
4. Maintains all existing functionality (videos, pagination, SEO)

## Example Usage

### Before (Auto-Generated Content)
```
About blowjob Sex Videos

Browse 544+ blowjob scenes featuring expert techniques and passionate 
performances captured in crystal-clear HD quality. Our blowjob library 
encompasses both high-budget professional content and genuine amateur 
contributions...
```

### After (Custom Content)
```
Premium Blowjob Collection

Discover our exclusive collection of premium blowjob videos featuring 
the industry's top performers. Each video is carefully selected for 
quality and performance, ensuring you get the best viewing experience.

Our collection includes:
- Professional studio productions
- Amateur homemade content  
- HD and 4K quality videos
- Regular updates with new content

Browse through our extensive library and enjoy unlimited streaming 
of high-quality adult content.
```

## Content Writing Tips

### Good Content Structure
1. **Engaging Title**: Use descriptive, SEO-friendly titles
2. **Introduction**: Brief overview of what users will find
3. **Key Features**: Bullet points or paragraphs highlighting benefits
4. **Call to Action**: Encourage users to browse or watch

### SEO Best Practices
- Include the tag name naturally in the content
- Use related keywords and synonyms
- Write 150-300 words for good SEO length
- Include numbers and statistics when relevant
- Make content unique and valuable

### Content Guidelines
- Keep content appropriate and professional
- Avoid duplicate content across different tags
- Update content periodically to keep it fresh
- Use line breaks for better readability

## Future Enhancements

### Planned Features
- **Rich Text Editor**: WYSIWYG editor with formatting options
- **Pornstar Pages**: Custom content for pornstar pages
- **Category Pages**: Custom content for category pages
- **Bulk Import**: Import content from CSV files
- **Content Templates**: Pre-made templates for different page types
- **Analytics**: Track which custom content performs best

### Advanced Features (Future)
- **A/B Testing**: Test different content versions
- **Scheduled Content**: Automatically publish content at specific times
- **Multi-language Support**: Content in different languages
- **Media Integration**: Add images and videos to content
- **SEO Analysis**: Built-in SEO scoring and suggestions

## Troubleshooting

### Content Not Showing
1. Check if content is marked as "Active"
2. Verify the slug matches exactly (case-sensitive)
3. Clear browser cache and refresh page
4. Check browser console for any JavaScript errors

### Admin Panel Issues
1. Ensure you're logged in as admin
2. Check if backend API is running on correct port
3. Verify database connection is working
4. Check browser network tab for API errors

### API Errors
- **404 Not Found**: Content doesn't exist for that tag
- **500 Server Error**: Database connection or server issue
- **400 Bad Request**: Missing required fields in form

## Support

If you encounter any issues or need help with the custom content system:
1. Check the browser console for error messages
2. Verify all required fields are filled
3. Ensure the backend API is running
4. Check database connectivity

The system is designed to be robust - if custom content fails to load, it will automatically fall back to the original auto-generated content, ensuring your site continues to work normally.
