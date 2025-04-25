import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');
    
    if (!taskId) {
      return NextResponse.json(
        { code: 400, msg: 'Missing taskId parameter', data: null },
        { status: 400 }
      );
    }

    const response = await fetch(`https://kieai.erweima.ai/api/v1/gpt4o-image/record-info?taskId=${taskId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.GPT4O_API_KEY}`,
      },
    });

    const responseData = await response.json();
    // console.log('status responseData', responseData);
    
    if (!response.ok || responseData.code !== 200) {
      return NextResponse.json({ status: response.status });
    }

    const status = responseData.data.status;

    if (status === 'SUCCESS') {
      return NextResponse.json({
            status: 'SUCCESS',
            imageUrl: responseData.data.response.resultUrls[0],
      });
    } else if (status === 'GENERATING') {
      return NextResponse.json({
        status: 'GENERATING',
      });
    } else {  
      return NextResponse.json({
        status: 'FAILED',
      });
    } 
   } catch (error) {
    return NextResponse.json(
      { code: 500, msg: 'Failed to fetch status', data: null },
      { status: 500 }
    );
  }
}