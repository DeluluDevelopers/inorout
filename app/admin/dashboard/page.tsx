// app/admin/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Booking {
  id: number;
  orderId: string;
  paymentId: string | null;
  amount: number;
  currency: string;
  status: string;
  ticketTier: string;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalBookings: number;
  hasNext: boolean;
  hasPrev: boolean;
  limit: number;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const router = useRouter();

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
        ...(tierFilter && { ticketTier: tierFilter }),
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/admin/bookings?${params}`);

      if (response.status === 401) {
        router.push("/admin");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data.bookings);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [currentPage, search, statusFilter, tierFilter, sortBy, sortOrder]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      CONFIRMED: "bg-green-100 text-green-800",
      FAILED: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getTierBadge = (tier: string) => {
    const colors = {
      REGULAR: "bg-blue-100 text-blue-800",
      VIP: "bg-purple-100 text-purple-800",
      VVIP: "bg-yellow-100 text-yellow-800",
    };
    return colors[tier as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  if (loading && !bookings.length) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                Admin Dashboard
              </h1>
              <p className='text-gray-600'>
                Manage event bookings and payments
              </p>
            </div>
            <button
              onClick={handleLogout}
              className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium'
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Stats Cards */}
        {pagination && (
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='text-2xl'>📊</div>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Total Bookings
                      </dt>
                      <dd className='text-lg font-medium text-gray-900'>
                        {pagination.totalBookings}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='text-2xl'>✅</div>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Confirmed
                      </dt>
                      <dd className='text-lg font-medium text-gray-900'>
                        {
                          bookings.filter((b) => b.status === "CONFIRMED")
                            .length
                        }
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='text-2xl'>⏳</div>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Pending
                      </dt>
                      <dd className='text-lg font-medium text-gray-900'>
                        {bookings.filter((b) => b.status === "PENDING").length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='text-2xl'>💰</div>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Total Revenue
                      </dt>
                      <dd className='text-lg font-medium text-gray-900'>
                        ₹
                        {bookings
                          .filter((b) => b.status === "CONFIRMED")
                          .reduce((sum, b) => sum + b.amount, 0)
                          .toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className='bg-white shadow rounded-lg mb-6'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h3 className='text-lg font-extrabold text-gray-900'>
              Filters & Search
            </h3>
          </div>
          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Search
                </label>
                <input
                  type='text'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Name, email, phone, order ID...'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500 bg-white'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white'
                >
                  <option value=''>All Statuses</option>
                  <option value='PENDING'>Pending</option>
                  <option value='CONFIRMED'>Confirmed</option>
                  <option value='FAILED'>Failed</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Ticket Tier
                </label>
                <select
                  value={tierFilter}
                  onChange={(e) => setTierFilter(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white'
                >
                  <option value=''>All Tiers</option>
                  <option value='REGULAR'>Regular</option>
                  <option value='VIP'>VIP</option>
                  <option value='VVIP'>VVIP</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Sort By
                </label>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split("-");
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white'
                >
                  <option value='createdAt-desc'>Latest First</option>
                  <option value='createdAt-asc'>Oldest First</option>
                  <option value='amount-desc'>Highest Amount</option>
                  <option value='amount-asc'>Lowest Amount</option>
                  <option value='customerName-asc'>Name A-Z</option>
                  <option value='customerName-desc'>Name Z-A</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className='bg-red-50 border border-red-200 rounded-md p-4 mb-6'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-red-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-red-800'>{error}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Table */}
        <div className='bg-white shadow overflow-hidden sm:rounded-md'>
          <div className='px-4 py-5 sm:px-6 border-b border-gray-200'>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>
              Booking Details
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
              Complete list of all event bookings and payments
            </p>
          </div>

          {loading ? (
            <div className='text-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto'></div>
              <p className='mt-2 text-gray-600'>Loading...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-gray-400 text-6xl mb-4'>📋</div>
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                No bookings found
              </h3>
              <p className='text-gray-600'>
                Try adjusting your filters or search terms.
              </p>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Customer
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Order Details
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Amount & Tier
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Status
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div>
                          <div className='text-sm font-medium text-gray-900'>
                            {booking.customerName || "N/A"}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {booking.customerEmail || "No email"}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {booking.customerPhone || "No phone"}
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div>
                          <div className='text-sm font-medium text-gray-900'>
                            {booking.orderId}
                          </div>
                          <div className='text-sm text-gray-500'>
                            Payment: {booking.paymentId || "Pending"}
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div>
                          <div className='text-sm font-medium text-gray-900'>
                            ₹{booking.amount.toLocaleString()}
                          </div>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTierBadge(
                              booking.ticketTier
                            )}`}
                          >
                            {booking.ticketTier}
                          </span>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {new Date(booking.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
              <div className='flex-1 flex justify-between sm:hidden'>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Next
                </button>
              </div>
              <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                <div>
                  <p className='text-sm text-gray-700'>
                    Showing{" "}
                    <span className='font-medium'>
                      {(currentPage - 1) * pagination.limit + 1}
                    </span>{" "}
                    to{" "}
                    <span className='font-medium'>
                      {Math.min(
                        currentPage * pagination.limit,
                        pagination.totalBookings
                      )}
                    </span>{" "}
                    of{" "}
                    <span className='font-medium'>
                      {pagination.totalBookings}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'>
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={!pagination.hasPrev}
                      className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      Previous
                    </button>

                    {/* Page numbers */}
                    {Array.from(
                      { length: Math.min(5, pagination.totalPages) },
                      (_, i) => {
                        const pageNum =
                          Math.max(
                            1,
                            Math.min(pagination.totalPages - 4, currentPage - 2)
                          ) + i;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              pageNum === currentPage
                                ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                    )}

                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={!pagination.hasNext}
                      className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
