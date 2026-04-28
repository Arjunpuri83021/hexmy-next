import { getVideoUrl } from '../../lib/dynamicVideoFetcher';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const forceRefresh = searchParams.get('forceRefresh') === 'true';
    
    if (!slug) {
      return Response.json({
        success: false,
        error: 'Missing slug parameter',
      }, { status: 400 });
    }
    
    const result = await getVideoUrl(slug, forceRefresh);
    
    if (result.success) {
      return Response.json(result, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
        status: 200,
      });
    } else {
      return Response.json(result, { status: 404 });
    }
  } catch (error) {
    console.error('Video URL API Error:', error);
    return Response.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
