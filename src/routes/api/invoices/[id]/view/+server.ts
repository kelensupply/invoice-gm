import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, locals: { supabase } }) => {
    const { id } = params;

    if (!id) {
        throw error(400, 'Document ID is required');
    }

    // Try to view invoice map status to "viewed" if it's "sent", bypassing auth requires Service Role if RLS blocked,
    // but the user only wants it marked "viewed" via public link. 
    // Usually Supabase `supabase` from `locals` might have public anons. Let's just do an update.

    // Check current status
    const { data: doc } = await supabase.from('invoices').select('id, status').eq('id', id).single();
    if (doc && doc.status === 'sent') {
        const { error: updateError } = await supabase
            .from('invoices')
            .update({
                status: 'viewed',
                viewed_at: new Date().toISOString()
            })
            .eq('id', id);

        if (updateError) {
            console.error('Failed to update viewed status', updateError);
            throw error(500, 'Internal Server Error');
        }
    }

    return new Response(JSON.stringify({ success: true }));
};
