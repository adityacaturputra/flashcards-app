import SearchTemplate, {
  SearchTemplate as ISearchTemplate,
} from '@/models/SearchTemplateModel';
import dbConnect from '@/lib/dbConnect';

export interface CreateSearchTemplateData {
  name: string;
  template: string;
  isDefault?: boolean;
  userId?: string;
}

export interface UpdateSearchTemplateData {
  name?: string;
  template?: string;
  isDefault?: boolean;
}

// Get all search templates for a user (including default ones)
export async function getSearchTemplates(
  userId?: string,
): Promise<ISearchTemplate[]> {
  try {
    await dbConnect();

    const query = userId ? { $or: [{ userId }, { isDefault: true }] } : {}; // Fetch all templates when no userId is provided

    const templates = await SearchTemplate.find(query).sort({
      isDefault: -1,
      createdAt: -1,
    });
    return templates;
  } catch (error) {
    console.error('Error fetching search templates:', error);
    throw new Error('Failed to fetch search templates');
  }
}

// Get a single search template by ID
export async function getSearchTemplateById(
  id: string,
  userId?: string,
): Promise<ISearchTemplate | null> {
  try {
    await dbConnect();

    const query = userId
      ? { _id: id, $or: [{ userId }, { isDefault: true }] }
      : { _id: id }; // Fetch any template by ID when no userId is provided

    const template = await SearchTemplate.findOne(query);
    return template;
  } catch (error) {
    console.error('Error fetching search template:', error);
    throw new Error('Failed to fetch search template');
  }
}

// Create a new search template
export async function createSearchTemplate(
  data: CreateSearchTemplateData,
): Promise<ISearchTemplate> {
  try {
    await dbConnect();

    const template = new SearchTemplate(data);
    const savedTemplate = await template.save();
    return savedTemplate;
  } catch (error) {
    console.error('Error creating search template:', error);
    throw new Error('Failed to create search template');
  }
}

// Update a search template
export async function updateSearchTemplate(
  id: string,
  data: UpdateSearchTemplateData,
  userId?: string,
): Promise<ISearchTemplate | null> {
  try {
    await dbConnect();

    const query = userId
      ? { _id: id, $or: [{ userId }, { isDefault: true }] }
      : { _id: id }; // Allow updating any template when no userId is provided

    // Don't allow updating default templates unless user owns them
    if (userId) {
      const existingTemplate = await SearchTemplate.findById(id);
      if (existingTemplate?.isDefault && existingTemplate.userId !== userId) {
        throw new Error('Cannot update default template');
      }
    }

    const template = await SearchTemplate.findOneAndUpdate(
      query,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true },
    );

    return template;
  } catch (error) {
    console.error('Error updating search template:', error);
    throw new Error('Failed to update search template');
  }
}

// Delete a search template
export async function deleteSearchTemplate(
  id: string,
  userId?: string,
): Promise<boolean> {
  try {
    await dbConnect();

    const query = userId
      ? { _id: id, userId } // Only allow deleting user's own templates
      : { _id: id }; // Allow deleting any template when no userId is provided

    // Don't allow deleting default templates
    const existingTemplate = await SearchTemplate.findById(id);
    if (existingTemplate?.isDefault) {
      throw new Error('Cannot delete default template');
    }

    const result = await SearchTemplate.deleteOne(query);
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting search template:', error);
    throw new Error('Failed to delete search template');
  }
}

// Initialize default search templates
export async function initializeDefaultTemplates(): Promise<void> {
  try {
    await dbConnect();

    // Delete old default templates that are no longer needed
    const templatesToDelete = [
      'Simple Definition',
      'Detailed Explanation',
      'Translation',
    ];
    await SearchTemplate.deleteMany({
      name: { $in: templatesToDelete },
      userId: { $exists: false }, // Only delete system templates
    });

    // Only one default template
    const defaultTemplate = {
      name: 'Indonesian Learning',
      template:
        'Apa itu {x} dan artinya serta berikan contohnya dalam percakapan bahasa inggris',
      isDefault: true,
    };

    // First, cleanup any duplicates (keep only the first one)
    const existingTemplates = await SearchTemplate.find({
      name: defaultTemplate.name,
      userId: { $exists: false },
    }).sort({ createdAt: 1 });

    // If there are duplicates, delete all except the first one
    if (existingTemplates.length > 1) {
      const idsToDelete = existingTemplates.slice(1).map((t) => t._id);
      await SearchTemplate.deleteMany({ _id: { $in: idsToDelete } });
    }

    // Use findOneAndUpdate with upsert to prevent race conditions
    // This atomically finds and updates, or creates if not exists
    await SearchTemplate.findOneAndUpdate(
      {
        name: defaultTemplate.name,
        userId: { $exists: false },
      },
      {
        $setOnInsert: defaultTemplate,
      },
      {
        upsert: true,
        new: true,
      },
    );
  } catch (error) {
    console.error('Error initializing default templates:', error);
    throw new Error('Failed to initialize default templates');
  }
}
