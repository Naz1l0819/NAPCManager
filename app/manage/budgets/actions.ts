'use server';

import { serverClient } from '../../../lib/supabaseServerClient';
import { revalidatePath } from 'next/cache';

export async function createBudget(form: FormData): Promise<void> {
  const supabase = serverClient();
  const month = form.get('month') as string;
  const category = form.get('category') as string;
  const description = form.get('description') as string;
  const amount = parseFloat(form.get('amount') as string);
  const { error } = await supabase.from('budgets').insert({
    month, category, description, amount_usd: amount
  });
  if (error) throw new Error(error.message);
  revalidatePath('/manage/budgets');
  return;
}

export async function deleteBudget(id: string): Promise<void> {
  const supabase = serverClient();
  const { error } = await supabase.from('budgets').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/manage/budgets');
  return;
}