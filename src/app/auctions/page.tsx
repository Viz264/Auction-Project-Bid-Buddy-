import { database } from '@/db/database';
import { ItemCard } from '@/app/item-card';
import { eq } from 'drizzle-orm';
import { items } from '@/db/schema';
import { auth } from '@/auth';
import { EmptyState } from './empty-state';
import { pagetTitleStyles } from '@/styles';

export default async function MyAuctionPage() {

    const session = await auth();
    if(!session || !session.user) {
        throw new Error("Unauthorized");
    }

  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id!),
  });

  const hasItems = allItems.length > 0;

  return ( 
    <main className="space-y-8">
      <h1 className={pagetTitleStyles}>Your Current Auctions</h1>
      
        {hasItems ? (
            <div className="grid grid-cols-4 gap-8">
                {allItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        ) : (
          <EmptyState />
        )}
    </main>
  );
} 