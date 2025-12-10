<script lang="ts">
  import { enhance } from '$app/forms';

  let { form } = $props();
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-900">
  <div class="w-full max-w-sm rounded-lg bg-gray-800 p-8 shadow-lg">
    <h1 class="mb-6 text-center text-2xl font-bold text-white">Enter Password</h1>

    <form method="POST" use:enhance>
      <input
        type="password"
        name="password"
        placeholder="Password"
        class="mb-4 w-full rounded border border-gray-600 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        required
      />

      {#if form?.error}
        <p class="mb-4 text-center text-red-400">{form.error}</p>
      {/if}

      <button
        type="submit"
        class="w-full rounded bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  </div>
</div>
