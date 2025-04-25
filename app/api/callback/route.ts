import { NextResponse } from 'next/server';
import { deleteImage } from '@/utils/blob';

export async function POST(request: Request): Promise<NextResponse> {
  console.log('收到回调请求');
  console.log('请求头:', request.headers);
  
  try {
    const data = await request.json();
    console.log('回调数据:', JSON.stringify(data, null, 2));
    
    if (data.code === 200 && data.msg === 'success' && data.data?.info?.result_urls?.[0]) {
      console.log('生成成功，图片URL:', data.data.info.result_urls[0]);
      
      // 删除临时图片
      if (data.data.filesUrl?.[0]) {
        try {
          await deleteImage(data.data.filesUrl[0]);
          console.log('临时图片删除成功');
        } catch (error) {
          console.error('删除临时图片失败:', error);
        }
      }
      
      return NextResponse.json({ 
        success: true,
        imageUrl: data.data.info.result_urls[0]
      });
    }

    console.log('回调数据格式不正确');
    return NextResponse.json({ success: false }, { status: 400 });
  } catch (error) {
    console.error('处理回调失败:', error);
    return NextResponse.json(
      { error: '处理回调失败' },
      { status: 500 }
    );
  }
} 