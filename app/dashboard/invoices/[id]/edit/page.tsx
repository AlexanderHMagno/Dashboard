import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data'
import EditInvoiceForm from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import React from 'react'
import { notFound } from 'next/navigation';

async function page({params} : {params:{id :string}}) {

    //fetch both at the same time
    const {id} = params;
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id), 
        fetchCustomers() 
    ])

    if(!invoice) notFound();

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
                label: 'Edit Invoice',
                href: `/dashboard/invoices/${id}/edit`,
                active: true,
            },
            ]}
        />
        <EditInvoiceForm invoice={invoice} customers={customers} />
        </main>
    );
    
}

export default page